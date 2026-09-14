import { expect, test } from './test';
import { expectNoAccessibilityViolations } from './accessibility';

test.describe('Homepage', () => {
  test('renders and exposes the Like slot with no automatic accessibility violations', async ({
    page,
  }) => {
    const response = await page.goto('/', { waitUntil: 'networkidle' });

    expect(response?.ok()).toBeTruthy();

    // The add-on registers the `LikeButton` component into the `contentArea`
    // slot, so it is present on the site root.
    await expect(
      page.getByRole('button', { name: /Like \(/ }),
    ).toBeVisible();

    await expectNoAccessibilityViolations(page, {
      // Baseline exceptions for the stock Aurora app shell (not the add-on):
      // the default site root omits an h1 and a top-level <main> landmark.
      // Everything else (contrast, labels, ARIA, …) is still asserted.
      disabledRules: ['page-has-heading-one', 'landmark-one-main'],
    });
  });
});
