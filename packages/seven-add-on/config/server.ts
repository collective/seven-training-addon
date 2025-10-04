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
      return {
        likes: {
          pathname: path,
          count: like?.count ?? 0,
        },
      };
    },
  });

  return config;
}
