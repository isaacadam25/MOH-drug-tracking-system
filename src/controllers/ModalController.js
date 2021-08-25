import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalController = (props) => {
  const { show, handleClose, title, children, label } = props;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      size="lg"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={() => handleClose()}>
          {label}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalController;
