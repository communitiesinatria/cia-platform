export type UserProps = {
  joined_on: string;
};

export interface User {
  _id: string;
  email: string;
  username: string;
  role: 'noob' | 'admin' | 'god' | 'core' | string;
  props: UserProps;
  bio?: string;
  name?: string;
  profile_img?: string;
  github?: string;
  instagram?: string;
}

export interface GlobalContextValue {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
}
