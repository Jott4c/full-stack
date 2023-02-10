export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IClientSession {
  email: string;
  password: string;
}

export interface IClientUpdate {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  oldPassword?: string;
}
