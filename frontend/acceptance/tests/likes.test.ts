import { login } from './login';
import { expect, test } from './test';
import { createContent } from './content';

/**
 * Acceptance coverage for the add-on's "Likes" feature:
 *
 * - the `LikeButton` slot component (registered into `contentArea`),
 * - the `Likes` `rootLoaderData` utility (server-side, Prisma-backed), whose
 *   payload is merged into the root loader data and read as `rootData.likes`,
 * - the `/@likes/*` resource route (GET returns the count, POST increments).
 *
 * Each test creates a Document at a unique path, so its like count starts at 0
 * (there is no row yet in the Prisma database for that pathname). This keeps the
 * assertions deterministic even though the Prisma store is not reset between
 * tests (only the Plone ZODB is, via the RobotRemote fixture).
 */
test.describe('Likes', () => {
  test('LikeButton renders the count and increments on click (persisted via the root loader)', async ({
    page,
  }) => {
    await login(page);

    const contentId = `likes-ui-${Date.now()}`;
    await createContent(page, {
      contentType: 'Document',
      contentId,
      contentTitle: 'Likes UI Document',
      transition: 'publish',
    });

    await page.goto(`/${contentId}`, { waitUntil: 'networkidle' });

    const likeButton = page.getByRole('button', { name: /👍 Like \(/ });
    // Fresh path -> no Prisma row yet -> count starts at 0.
    await expect(likeButton).toHaveText(/Like \(0\)/);

    // Client-side fetcher submit: the count updates in place and the
    // confirmation message appears (no full-page navigation).
    await likeButton.click();
    await expect(likeButton).toHaveText(/Like \(1\)/);
    await expect(page.getByText('Thanks for liking!')).toBeVisible();

    // Reload: the SSR-rendered count now reflects the persisted value, proving
    // the `rootLoaderData` utility reads it back via `rootData.likes`.
    await page.goto(`/${contentId}`, { waitUntil: 'networkidle' });
    await expect(
      page.getByRole('button', { name: /👍 Like \(/ }),
    ).toHaveText(/Like \(1\)/);
  });

  test('the /@likes route returns the current count and increments on POST', async ({
    page,
  }) => {
    await login(page);

    const contentId = `likes-api-${Date.now()}`;
    await createContent(page, {
      contentType: 'Document',
      contentId,
      contentTitle: 'Likes API Document',
      transition: 'publish',
    });

    // GET returns the current count for the pathname (0 for a fresh path).
    const getResponse = await page.request.get(`/@likes/${contentId}`);
    expect(getResponse.ok()).toBeTruthy();
    expect(await getResponse.json()).toMatchObject({
      pathname: `/${contentId}`,
      count: 0,
    });

    // POST increments and returns the updated record.
    const postResponse = await page.request.post(`/@likes/${contentId}`);
    expect(postResponse.ok()).toBeTruthy();
    expect(await postResponse.json()).toMatchObject({
      pathname: `/${contentId}`,
      count: 1,
    });

    // A subsequent GET reflects the incremented count.
    const getAgain = await page.request.get(`/@likes/${contentId}`);
    expect(await getAgain.json()).toMatchObject({
      pathname: `/${contentId}`,
      count: 1,
    });
  });
});
