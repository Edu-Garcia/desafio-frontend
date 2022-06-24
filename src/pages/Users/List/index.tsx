import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import DataTable from '../../../components/DataTable';
import { IUser } from '../../../interfaces';
import UsersService from '../../../services/users.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import Button from '../../../components/Button';
import './list.scss';
import InputCpfMasked from '../../../components/InputCpfMasked';
import ModalDelete from '../../../components/ModalDelete';
import { useAuth } from '../../../contexts/AuthContext/useAuth';

const columns = [
  { label: 'Nome', key: 'name', isCenter: true },
  { label: 'Data de nascimento', key: 'birth_date', isDate: true },
  { label: 'CPF', key: 'cpf' },
  { label: 'Permissão', key: 'permission' },
];

const Users: React.FunctionComponent = (): React.ReactElement => {
  const [users, setUsers] = useState<IUser[]>([]);

  const [nameFilter, setNameFilter] = useState('');
  const [cpfFilter, setCpfFilter] = useState('');
  const [permissionFilter, setPermissionFilter] = useState('');

  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  let filteredUsers: IUser[] = [];

  const { user, token, signOut } = useAuth();
  const isAdmin: boolean = user.permission === 'admin';

  const navigate = useNavigate();

  const deleteUser = async (id: string): Promise<void> => {
    try {
      await UsersService.delete(token, id);
      toastMsg(ToastType.Success, 'Usuário excluído com sucesso!');

      const data = await UsersService.users(token);
      setUsers(data);

      if (id === user.id) {
        navigate('/');
      }
    } catch (error) {
      toastMsg(ToastType.Error, (error as AxiosError).response?.data.message || 'Internal Server Error!');
    }
  };

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const data = await UsersService.users(token);
        setUsers(data);
      } catch (error) {
        toastMsg(ToastType.Error, (error as AxiosError).response?.data || 'Internal Server Error!');
        signOut();
      }
    };

    fetchUsers();
  }, [token, signOut]);

  filteredUsers = users;

  if (nameFilter) {
    filteredUsers = filteredUsers.filter((filterUser) =>
      filterUser.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  if (cpfFilter) {
    filteredUsers = filteredUsers.filter((filterUser) => filterUser.cpf.includes(cpfFilter));
  }

  if (permissionFilter) {
    filteredUsers = filteredUsers.filter((filterUser) =>
      filterUser.permission.toLowerCase().includes(permissionFilter.toLowerCase())
    );
  }

  return (
    <Section className="users" title="Listagem de usuários" description="Listagem de usuários">
      <Row>
        <Col md={12}>
          <Text as="h1" size="2rem" weight={700}>
            Usuários
          </Text>
        </Col>
      </Row>
      <Row>
        {isAdmin && (
          <>
            <Col md={6} className="mt-3 mb-2">
              <Button type="button" variant="primary" onClick={() => navigate('/usuarios/acao')} cy="test-create">
                Cadastrar usuário
              </Button>
            </Col>
            <Col md={6} className="mt-3 mb-2 col-button-logout">
              <Button type="button" variant="danger" onClick={() => signOut()} cy="test-signout">
                Encerrar sessão
              </Button>
            </Col>
          </>
        )}
        <Col md={4} className="mt-3 mb-2 col-input-filter">
          <label htmlFor="name-filter">
            Nome:
            <input
              type="text"
              name="name-filter"
              id="name-filter"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </label>
        </Col>
        <Col md={4} className="mt-3 mb-2 col-input-filter">
          <InputCpfMasked
            label="Cpf:"
            name="cpf-filter"
            id="cpf-filter"
            value={cpfFilter}
            mask="999.999.999-99"
            onChange={(e) => setCpfFilter(e.target.value)}
          />
        </Col>
        <Col md={4} className="mt-3 mb-2 col-input-filter">
          <label htmlFor="permission-filter">
            Permissão:
            <select
              name="permission-filter"
              id="permission-filter"
              value={permissionFilter}
              onChange={(e) => setPermissionFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="admin">Administrador</option>
              <option value="colaborator">Colaborador</option>
            </select>
          </label>
        </Col>
        <Col md={12}>
          <DataTable
            data={filteredUsers}
            columns={columns}
            hasActions={isAdmin}
            editAction={(id) => navigate(`/usuarios/acao/${id}`)}
            deleteModal={(id) => {
              setShow(true);
              setDeleteId(id);
            }}
          />
        </Col>
        <ModalDelete show={show} setShow={setShow} id={deleteId} deleteAction={deleteUser} />
      </Row>
    </Section>
  );
};

export default Users;
