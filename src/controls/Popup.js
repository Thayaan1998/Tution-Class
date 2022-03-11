import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

const Popup = (props) => {
    const {children,show,handleClose,title}=props;
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <ModalHeader closeButton>
                <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
             {children}
            </ModalBody>
        </Modal>
    );


}

export default Popup;