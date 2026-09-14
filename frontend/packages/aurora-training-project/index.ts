import type { ConfigType } from '@plone/registry';
import installRoutes from './config/routes';
import installSlots from './config/slots';

export default function install(config: ConfigType) {
  installRoutes(config);
  installSlots(config);

  return config;
}
