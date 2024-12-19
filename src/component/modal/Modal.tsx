import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const modalRoot = document.getElementById('modal-root');

    // Закрытие по клавише ESC
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
            onClose();
        }
    }, [onClose, isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        } else {
            document.removeEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, handleEscape]);

    if (!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    &times;
                </button>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>,
        modalRoot
    );
};
