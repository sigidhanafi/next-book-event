import NextAuth from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }

  interface User {
    id: number;
    address: string;
    phone: string;
    image: string;
    is_verified_user: boolean;
    is_verified_community_owner: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    is_verified_user: boolean;
    is_verified_community_owner: boolean;
  }

  // name: 'John Do',
  // email: 'sigidhanafi@gmail.com',
  // sub: '1',
  // id: 1,
  // password: 'sigithanafi',
  // address: 'Jl address nomor 20 Kelurahan, Kecamatan, Kota, Provinsi',
  // phone: '085xxxxxxxx',
  // is_verified_user: true,
  // is_verified_community_owner: true,
  // createdAt: '2023-03-28T18:56:03.209Z',
  // updatedAt: '2023-03-28T18:56:03.209Z',
  // iat: 1680557832,
  // exp: 1683149832,
  // jti: '015719f9-773c-4931-a2b6-15857c31e7a9'
}
