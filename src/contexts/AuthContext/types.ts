export interface IAuthContext {
  token: string | null;
  user: IContextUser;
  signIn: (data: ISessionResponse) => void;
  signOut: () => void;
  signed: boolean;
}

export interface IContextUser {
  id: string | null;
  permission: string | null;
}

export interface IAuthProvider {
  children: JSX.Element;
}

export interface ISessionResponse {
  token: string;
  user: {
    id: string;
    permission: string;
  };
}
