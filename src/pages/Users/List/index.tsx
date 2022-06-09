import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import DataTable from '../../../components/DataTable';
import { IUser } from '../../../interfaces';
import UsersService from '../../../services/users.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import Button from '../../../components/Button';

const columns = [
  { label: 'Nome', key: 'name', isCenter: true },
  { label: 'Data de nascimento', key: 'birth_date', isDate: true },
  { label: 'CPF', key: 'cpf' },
  { label: 'Permissão', key: 'permission' },
];

const Users: React.FunctionComponent = (): React.ReactElement => {
  const [users, setUsers] = useState<IUser[]>([]);

  const history = useHistory();

  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await UsersService.users();
      setUsers(data);
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    try {
      await UsersService.delete(id);
      toastMsg(ToastType.Success, 'Usuário excluído com sucesso!');
      fetchUsers();
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  useEffect(() => {
    let isCleaningUp = false;

    if (!isCleaningUp) {
      fetchUsers();
    }
    return () => {
      isCleaningUp = true;
    };
  }, []);

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
        <Col md={12} className="mt-3 mb-2">
          <Button type="button" variant="primary" onClick={() => history.push('/usuarios/acao')} cy="test-create">
            Cadastrar usuário
          </Button>
        </Col>
        <Col md={12}>
          <DataTable
            data={users}
            columns={columns}
            hasActions
            deleteAction={(id) => deleteUser(id)}
            editAction={(id) => history.push(`/usuarios/acao/${id}`)}
          />
        </Col>
      </Row>
    </Section>
  );
};

export default Users;
