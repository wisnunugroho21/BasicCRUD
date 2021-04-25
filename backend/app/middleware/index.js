import localAuth from './auth/local';

export default (app) => {
  return {
    auth: localAuth(app),
  };
};
