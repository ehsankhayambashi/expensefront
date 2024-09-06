export const Logout = () => {
  if (typeof window != "undefined") {
    localStorage.clear();
    window.location.href = "/login";
  }
};
