import { useState, useEffect } from "react";
import "../styles/components/Header.css";
import { Button, Modal } from "react-bootstrap";

const CustomModal = ({ title, children, showModal }) => {
  const [show, setShow] = useState(showModal)

  useEffect(() => {
console.log(showModal)
console.log(show)
    setShow(showModal);
  }, [showModal]);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title className="fs-5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>
          Cancelar
        </Button>
        <Button>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
