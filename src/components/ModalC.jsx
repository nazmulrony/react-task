import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ModalC = ({ showC, handleClose, openA, openB, data }) => {
    return (
        <Modal show={showC} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Contact Details</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: "200px", overflowY: "scroll" }}>
                <p>ID: {data?.id}</p>
                <p>Phone: {data?.phone}</p>
                <p>Country: {data?.country?.name}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    style={{
                        backgroundColor: "#46139f",
                        borderColor: "transparent",
                    }}
                    variant="primary"
                    onClick={() => {
                        handleClose();
                        openA();
                    }}
                >
                    Button A
                </Button>
                <Button
                    style={{
                        backgroundColor: "#ff7f50",
                        borderColor: "transparent",
                    }}
                    variant="primary"
                    onClick={() => {
                        handleClose();
                        openB();
                    }}
                >
                    Button B
                </Button>
                <Button
                    style={{
                        backgroundColor: "white",
                        borderColor: "#46139f",
                        color: "#46139f",
                    }}
                    variant="primary"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
