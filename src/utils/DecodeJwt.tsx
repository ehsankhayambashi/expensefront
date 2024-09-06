import jwt from "jsonwebtoken";
export const DecodeJwt = (token: any) => {
  if (typeof window !== "undefined") {
    if (token) {
      let payload = jwt.decode(token);
      return payload as any;
    } else {
      return null;
    }
  }
};
