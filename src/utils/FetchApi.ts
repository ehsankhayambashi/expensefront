import redaxios, { Options, Response } from "redaxios";

export type TResponse<T> = Response<T>;
export type OptionsType = Options;

let defaultOpTion: any = null;

const loadToken = () => {
  if (typeof window !== "undefined") {
    const encryptedAccess = localStorage.getItem("access");
    if (encryptedAccess) {
      const access = encryptedAccess;
      defaultOpTion = {
        headers: {
          authorization: `Bearer ${access}`,
        },
      };
    } else {
      defaultOpTion = null; // Clear if no token is in local storage
    }
  }
};

// This flag will track if the user is logging in for the first time
let isLoggingIn = false;

// Ensure token is always loaded from localStorage before each request
const checkAuthorization = () => {
  loadToken();
  if (!defaultOpTion || !defaultOpTion.headers.authorization) {
    if (!isLoggingIn) {
      if (typeof window !== "undefined") {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  }
};

const get = async (
  link: string,
  Option?: Options | undefined
): Promise<Response<any>> => {
  checkAuthorization();
  return redaxios.get(link, { ...Option, ...defaultOpTion });
};

const post = async (
  link: string,
  body: any,
  Option?: Options | undefined
): Promise<Response<any>> => {
  checkAuthorization();
  return redaxios.post(link, body, {
    ...Option,
    headers: { ...defaultOpTion?.headers, ...Option?.headers },
  });
};

const patch = async (
  link: string,
  body: any,
  Option?: Options | undefined
): Promise<Response<any>> => {
  checkAuthorization();
  return redaxios.patch(link, body, {
    ...Option,
    headers: { ...defaultOpTion?.headers, ...Option?.headers },
  });
};

const put = async (
  link: string,
  body: any,
  Option?: Options | undefined
): Promise<Response<any>> => {
  checkAuthorization();
  return redaxios.put(link, body, {
    ...Option,
    headers: { ...defaultOpTion?.headers, ...Option?.headers },
  });
};

const deleteMethod = async (
  link: string,
  Option?: Options | undefined
): Promise<Response<any>> => {
  checkAuthorization();
  return redaxios.delete(link, {
    ...Option,
    headers: { ...defaultOpTion?.headers, ...Option?.headers },
  });
};

// Method to be called when the login process starts
const startLogin = () => {
  isLoggingIn = true;
};
// Method to set the token manually if needed
const setToken = (token: string) => {
  if (!defaultOpTion) {
    defaultOpTion = { headers: {} };
  }
  defaultOpTion.headers.authorization = "Bearer " + token;
  isLoggingIn = false; // Reset the login flag once the token is set
};

// Method to remove the token
const removeToken = () => {
  defaultOpTion = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("access");
  }
};

// Exporting all the methods
const FetchApi = {
  get,
  post,
  patch,
  put,
  delete: deleteMethod,
  setToken,
  removeToken,
  startLogin,
};

export default FetchApi;
