import localAuth from './auth/local';

export default (app, passport) => {
  return {
    auth: localAuth(passport),
  };
};
