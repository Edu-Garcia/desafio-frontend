import { Form, Formik } from 'formik';
import * as yup from 'yup';
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Text from '../../components/Text';
import './home.scss';
import SessionsService from '../../services/sessions.service';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { AuthContext } from '../../contexts/AuthContext';

const loginSchema = yup.object().shape({
  cpf: yup.string().min(11, 'Min. 11 caracteres').max(14, 'Máximo 14 caracteres').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

interface ILogin {
  cpf: string;
  password: string;
}

const defaultValue = {
  cpf: '',
  password: '',
} as ILogin;

const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const [loader, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(defaultValue as ILogin);

  const handleSubmit = async (values: ILogin): Promise<void> => {
    try {
      setLoader(true);
      const { cpf, password } = values;

      const data = await SessionsService.create(cpf, password);
      signIn(data);

      if (data.token) {
        toastMsg(ToastType.Success, 'Login realizado com sucesso!');
        navigate('/usuarios');
      }

      setLoader(false);
    } catch (error) {
      setLoader(false);
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  useEffect(() => {
    setInitialValues(defaultValue);
  }, []);

  return (
    <div className="main-container">
      <Row>
        <Col md={12}>
          <Text as="h1" size="2rem" weight={700}>
            Realizar login
          </Text>
        </Col>
        <Col md={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            enableReinitialize
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form autoComplete="off">
                <Row>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputCpf"
                      isInvalid={(errors.cpf && touched.cpf) || false}
                      msg={errors.cpf}
                      label="Cpf"
                      id="cpf"
                      name="cpf"
                      placeholder="Insira o cpf"
                      mask="999.999.999-99"
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputPassword"
                      isInvalid={(errors.password && touched.password) || false}
                      msg={errors.password}
                      label="Senha"
                      id="password"
                      name="password"
                      as="input"
                      placeholder="Insira a senha"
                    />
                  </Col>
                  <Col md={12} className="mt-3 button-login">
                    <Button type="submit" disabled={loader} variant="primary" cy="test-create">
                      Entrar
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
