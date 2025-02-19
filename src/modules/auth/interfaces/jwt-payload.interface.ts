export type JwtPayload = {
  username: string;
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
};
