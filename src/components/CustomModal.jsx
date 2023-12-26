import "../styles/components/Header.css";
import { Modal } from "react-bootstrap";

const CustomModal = ({ title, body, footer, showModal, onShow, onHide }) => {
  return (
    <Modal
      centered={true}
      show={showModal}
      onShow={onShow}
      onHide={onHide}
      onEscapeKeyDown={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
