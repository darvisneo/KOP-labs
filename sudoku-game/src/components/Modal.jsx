import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <div className="modal-body">{children}</div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;