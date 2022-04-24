import * as dev from './dev.env';
import * as prop from './prod.env';

const envconfigs = {
  development: dev,
  production: prop,
};
const environment = envconfigs[process.env.NODE_ENV || 'development'];

export { environment };
