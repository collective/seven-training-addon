import type { RootLoader } from 'seven/app/root';
import { Button } from '@plone/components/quanta';
import { useFetcher, useParams, useRouteLoaderData } from 'react-router';

export default function LikeButton() {
  const fetcher = useFetcher();
  const params = useParams();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const pathname = params['*'] ? `/${params['*']}` : '/';
  const rootCount = rootData?.likes?.count ?? 0;
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
