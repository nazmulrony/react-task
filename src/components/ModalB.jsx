import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export const ModalB = ({ showB, openA, openB, openC, handleClose }) => {
    const [page, setPage] = useState(1);
    const [contacts, setContacts] = useState([]);
    const fetchContacts = useCallback(async () => {
        const res = await fetch(
            `https://contact.mediusware.com/api/country-contacts/United%20States/?page=${page}`
        );
        const data = await res.json();
        setContacts([...data?.results]);
    }, [page]);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    return (
        <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
        >
            <Modal show={showB} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>US Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: "450px", overflowY: "scroll" }}>
                    <div className="d-grid gap-3">
                        {contacts?.map((contact) => (
                            <div
                                className="border rounded p-2"
                                style={{ cursor: "pointer" }}
                                key={contact?.id}
                                onClick={() => openC(contact)}
                            >
                                <p>{contact?.phone}</p>
                                <p>{contact?.country?.name}</p>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex gap-2">
                        <Button
                            className="mt-2"
                            variant="primary"
                            onClick={() => setPage(page - 1)}
                        >
                            Prev
                        </Button>
                        <Button
                            className="mt-2"
                            variant="primary"
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </Button>
                    </div>
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
        </div>
    );
};
