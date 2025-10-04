import type { ConfigType } from '@plone/registry';
import LikeButton from '../slots/LikeButton';

export default function install(config: ConfigType) {
  config.registerSlotComponent({
    name: 'LikeButton',
    slot: 'contentArea',
    component: LikeButton,
  });

  return config;
}
