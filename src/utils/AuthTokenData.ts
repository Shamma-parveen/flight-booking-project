class AuthTokenData {
  static key = "auth-token";
  static get = () => {
    return localStorage.getItem(AuthTokenData.key);
  };
  static set = (token: string) => {
    localStorage.setItem(AuthTokenData.key, token);
  };
  static remove = () => {
    localStorage.removeItem(AuthTokenData.key);
  };
}
export default AuthTokenData;
