import type { ConfigType } from '@plone/registry';
import prisma from '../lib/prisma';

export default function install(config: ConfigType) {
  config.registerUtility({
    name: 'Likes',
    type: 'rootLoaderData',
    method: async ({ path }) => {
      const like = await prisma.urlLike.findUnique({
        where: { pathname: path },
      });
      // Aurora's `rootLoaderData` utilities return a `{ status, data }`
      // envelope; the root loader merges each utility's `data` into the root
      // loader data. Namespace the payload under a unique key (`likes`) so it
      // is exposed as `rootData.likes` and does not clobber other utilities.
      return {
        status: 200,
        data: {
          likes: {
            pathname: path,
            count: like?.count ?? 0,
          },
        },
      };
    },
  });

  return config;
}
