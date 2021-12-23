import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CustomButton from "../Button";
import SignInForm from "../LoginForm";

type TypeProp = {
  closeNavWindow : () => void
}
export default function Singin({closeNavWindow}:TypeProp) {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <CustomButton 
        color="outline-primary" 
        text="Sign in" 
        onClick={function () {
          handleShow();
          closeNavWindow()

        }} 
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignInForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}