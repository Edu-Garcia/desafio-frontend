import HttpClient from './httpClient';
import { IUser } from '../interfaces';

class UsersService {
  static async users(token: string | null): Promise<IUser[]> {
    HttpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { data } = await HttpClient.api.get<IUser[]>('/api/v1/users');
    return data;
  }

  static async user(token: string | null, userId: string): Promise<IUser> {
    HttpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { data } = await HttpClient.api.get(`/api/v1/users/${userId}`);
    return data;
  }

  static async create(
    token: string | null,
    name: string,
    password: string,
    birth_date: Date,
    cpf: string,
    observations: string,
    permission: string
  ): Promise<void> {
    HttpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const obj = { name, password, birth_date, cpf, observations, permission };
    const { data } = await HttpClient.api.post('/api/v1/users', obj);
    return data;
  }

  static async update(token: string | null, observations: string, permission: string, id: string): Promise<void> {
    HttpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const obj = { observations, permission };
    const { data } = await HttpClient.api.put(`/api/v1/users/${id}`, obj);
    return data;
  }

  static async delete(token: string | null, id: string): Promise<number> {
    HttpClient.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { status } = await HttpClient.api.delete(`/api/v1/users/${id}`);

    return status;
  }
}

export default UsersService;
