import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.registerRoute({
    type: 'route',
    path: '@likes/*',
    file: 'seven-add-on/routes/api.likes.ts',
    options: {
      id: 'likes',
    },
  });

  return config;
}
