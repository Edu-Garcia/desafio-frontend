import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IModalDelete {
  show: boolean;
  setShow: (show: boolean) => void;
  id: string;
  deleteAction: (id: string) => void;
}

const ModalDelete = ({ show, setShow, id, deleteAction }: IModalDelete): React.ReactElement => (
  <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Deseja mesmo deletar o usuário?</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShow(false)}>
        Cancelar
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          deleteAction(id);
          setShow(false);
        }}
      >
        Excluir
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ModalDelete;
