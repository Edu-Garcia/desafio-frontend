import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import UsersService from '../../../services/users.service';
import { IParam } from '../../../interfaces';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import DatePicker from '../../../components/DatePicker';

const createSchema = yup.object().shape({
  name: yup.string().min(2, 'Min. 2 caracteres').max(120, 'Máximo 120 caracteres').required('Campo obrigatório'),
  birth_date: yup.date().required('Campo obrigatório').nullable(),
  cpf: yup.string().min(11, 'Min. 11 caracteres').max(14, 'Máximo 14 caracteres').required('Campo obrigatório'),
  observations: yup.string().max(500, 'Máximo 500 caracteres'),
  permission: yup.string().oneOf(['admin', 'colaborator']).required('Campo obrigatório'),
});

interface ICreate {
  name: string;
  birth_date: Date | null;
  cpf: string;
  observations: string;
  permission: string;
}

const defaultValue = {
  name: '',
  birth_date: null,
  cpf: '',
  observations: '',
  permission: '',
} as ICreate;

const Create: React.FunctionComponent = (): React.ReactElement => {
  const history = useHistory();
  const { id } = useParams<IParam>();
  const [loader, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(defaultValue as ICreate);

  const handleSubmit = async (values: ICreate): Promise<void> => {
    try {
      setLoader(true);
      const { name, birth_date, cpf, observations, permission } = values;

      if (id) {
        await UsersService.update(observations, permission, id);
        toastMsg(ToastType.Success, 'Atualização realizada com sucesso!');
      } else {
        await UsersService.create(name, birth_date as Date, cpf, observations, permission);
        toastMsg(ToastType.Success, 'Cadastro realizado com sucesso!');
      }

      setLoader(false);
      history.push('/usuarios');
    } catch (error) {
      setLoader(false);
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  useEffect(() => {
    let isCleaningUp = false;

    async function getUserById(): Promise<void> {
      try {
        if (!isCleaningUp && id) {
          const res = await UsersService.user(id);
          if (res) {
            setInitialValues(res as ICreate);
          }
        }
      } catch (error) {
        toastMsg(ToastType.Error, (error as Error).message);
      }
    }

    getUserById();

    return () => {
      isCleaningUp = true;
    };
  }, [history, id]);

  return (
    <Section
      className="create"
      title={`${id ? 'Editar' : 'Criar'} usuário`}
      description={`${id ? 'Editar' : 'Criar'} usuário`}
    >
      <Row className="mb-5">
        <Col md={12}>
          <Text as="h1" size="2rem" weight={700}>
            {id ? 'Editar' : 'Criar'} usuário
          </Text>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={createSchema}
            enableReinitialize
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form autoComplete="off">
                <Row>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputName"
                      isInvalid={(errors.name && touched.name) || false}
                      msg={errors.name}
                      label="Nome do usuário"
                      id="name"
                      name="name"
                      as="input"
                      placeholder="Insira um nome para o usuário"
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <DatePicker
                      isInvalid={(errors.name && touched.name) || false}
                      msg={errors.birth_date}
                      label="Data de nascimento"
                      id="birth_date"
                      name="birth_date"
                      fieldValue={values.birth_date}
                      setFieldValue={setFieldValue}
                      errors={errors.birth_date}
                      touched={touched.birth_date}
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputCpf"
                      isInvalid={(errors.cpf && touched.cpf) || false}
                      msg={errors.cpf}
                      label="Cpf"
                      id="cpf"
                      name="cpf"
                      placeholder="Insira um cpf para o usuário"
                      mask="999.999.999-99"
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputObservations"
                      isInvalid={(errors.observations && touched.observations) || false}
                      msg={errors.observations}
                      label="Observações (opcional)"
                      id="observations"
                      name="observations"
                      as="textarea"
                      placeholder="Insira algumas observações sobre o usuário"
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputPermission"
                      isInvalid={(errors.permission && touched.permission) || false}
                      msg={errors.permission}
                      label="Permissão"
                      id="permission"
                      name="permission"
                      as="select"
                    >
                      <option value="">Selecione uma permissão</option>
                      <option value="admin">Administrador</option>
                      <option value="colaborator">Colaborador</option>
                    </Input>

                  </Col>
                  <Col md={12} className="mt-3">
                    <Button type="submit" disabled={loader} variant="primary" cy="test-create">
                      {id ? 'Editar informações do usuário' : 'Cadastrar novo usuário'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Section>
  );
};

export default Create;
