import React, { useState } from "react";
import { ModalA } from "./ModalA";
import { ModalC } from "./ModalC";
import { ModalB } from "./ModalB";

const Problem2 = () => {
    const [contact, setContact] = useState({});

    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);
    const [showC, setShowC] = useState(false);

    const closeA = () => setShowA(false);
    const openA = () => setShowA(true);

    const closeB = () => setShowB(false);
    const openB = () => setShowB(true);

    const closeC = () => setShowC(false);
    const openC = (data) => {
        setContact(data);
        setShowC(true);
        closeA();
        closeB();
    };
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-primary"
                        type="button"
                        onClick={openA}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                    >
                        US Contacts
                    </button>
                </div>
            </div>
            {showA && (
                <ModalA
                    showA={showA}
                    openA={openA}
                    openB={openB}
                    openC={openC}
                    handleClose={closeA}
                />
            )}

            {showB && (
                <ModalB
                    showB={showB}
                    openA={openA}
                    openB={openB}
                    openC={openC}
                    handleClose={closeB}
                />
            )}

            {showC && (
                <ModalC
                    showC={showC}
                    openA={openA}
                    openB={openB}
                    handleClose={closeC}
                    data={contact}
                />
            )}
        </div>
    );
};

export default Problem2;
