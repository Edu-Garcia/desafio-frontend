import HttpClient from './httpClient';
import { IUser } from '../interfaces';

class UsersService {
  static async users(): Promise<IUser[]> {
    const { data } = await HttpClient.api.get<IUser[]>('/api/v1/users');
    return data;
  }

  static async user(id: string): Promise<IUser> {
    const { data } = await HttpClient.api.get(`/api/v1/users/${id}`);
    return data;
  }

  static async create(name: string, birth_date: Date, cpf: string, observations: string, permission: string): Promise<void> {
    const obj = { name, birth_date, cpf, observations, permission };
    const { data } = await HttpClient.api.post('/api/v1/users', obj);
    return data;
  }

  static async update(observations: string, permission: string, id: string): Promise<void> {
    const obj = { observations, permission };
    const { data } = await HttpClient.api.put(`/api/v1/users/${id}`, obj);
    return data;
  }

  static async delete(id: string): Promise<number> {
    const { status } = await HttpClient.api.delete(`/api/v1/users/${id}`);

    return status;
  }
}

export default UsersService;
