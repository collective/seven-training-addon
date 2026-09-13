import type { RootLoader } from '@plone/aurora/app/root';
import { Button } from '@plone/components/quanta';
import { useFetcher, useParams, useRouteLoaderData } from 'react-router';

export default function LikeButton() {
  const fetcher = useFetcher();
  const params = useParams();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const pathname = params['*'] ? `/${params['*']}` : '/';
  // The `Likes` rootLoaderData utility namespaces its payload under `likes`,
  // which the root loader merges into the root data (see the add-on's
  // `config/server.ts`).
  const likes = rootData?.likes as
    | { pathname: string; count: number }
    | undefined;
  const rootCount = likes?.count ?? 0;
  const fetcherRecord = fetcher.data as { count?: number } | undefined;
  const fetcherCount =
    typeof fetcherRecord?.count === 'number' ? fetcherRecord.count : undefined;
  const likeCount = fetcherCount ?? rootCount;

  return (
    <div className="text-center mt-10">
      <fetcher.Form
        method="post"
        action={`/@likes${pathname}`}
        className="inline"
      >
        <Button
          variant="primary"
          accent
          type="submit"
          isDisabled={fetcher.state === 'submitting'}
        >
          👍 Like ({likeCount})
        </Button>
      </fetcher.Form>
      {typeof fetcherCount === 'number' && (
        <div className="text-green-500 my-2">Thanks for liking!</div>
      )}
    </div>
  );
}
