import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import './app-modal.css';

interface IAppModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function AppModal({ isOpen, onClose, children }: IAppModalProps) {
    if (!isOpen) {
        return null
    };

    return ReactDOM.createPortal(
        <div className="app-modal__overlay">
            <div
                className="app-modal__content"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="app-modal__close-button"
                    onClick={onClose}
                >
                    <MdClose size={24} />
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('root')!
    );
}

export default AppModal;
