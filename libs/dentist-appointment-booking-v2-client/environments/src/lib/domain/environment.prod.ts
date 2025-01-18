import { EnvironmentConfig } from './environment-config';

export const environment: EnvironmentConfig = {
  production: true,
  apiUrl: 'http://dab-v2-server-lb-560144482.us-east-1.elb.amazonaws.com:3000',
  photoApiUrl: 'https://pst5siyvl1.execute-api.us-east-1.amazonaws.com'
};
