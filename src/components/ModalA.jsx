import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export const ModalA = ({ showA, openA, openB, openC, handleClose }) => {
    const [page, setPage] = useState(1);
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");

    const [check, setCheck] = useState(false);

    let debounceTimeout;
    const fetchContacts = useCallback(async () => {
        const res = await fetch(
            `https://contact.mediusware.com/api/contacts/?page=${page}&search=${search}`
        );
        const data = await res.json();
        setContacts([...data?.results]);
    }, [page, search]);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts, search]);

    useEffect(() => {
        if (check) {
            setContacts((prevContacts) =>
                prevContacts.filter((contact) => contact.id % 2 === 0)
            );
        } else {
            fetchContacts();
        }
    }, [check]);

    const handlePhoneNumberChange = (event) => {
        const newPhoneNumber = event.target.value;

        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
            setSearch(newPhoneNumber);
        }, 1000);
    };

    return (
        <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
        >
            <Modal show={showA} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div className="">
                        <Modal.Title>All Contacts</Modal.Title>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            name="search phone"
                            onChange={handlePhoneNumberChange}
                        />
                    </div>
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
                                <p>ID: {contact.id}</p>
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
                    <div
                        onClick={() => setCheck((value) => !value)}
                        style={{ cursor: "pointer" }}
                    >
                        <input
                            type="checkbox"
                            placeholder="Search"
                            name="search"
                            checked={check}
                            onChange={() => setCheck((value) => !value)}
                        />
                        Only even
                    </div>
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
