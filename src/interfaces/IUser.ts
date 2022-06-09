export interface IUser {
  id: string;
  name: string;
  password: string;
  birth_date: Date;
  cpf: string;
  observations?: string;
  permission: string;
  created_at: Date;
  updated_at: Date;
}
