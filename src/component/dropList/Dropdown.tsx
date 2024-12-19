import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Dropdown.module.css';

type DropdownItem = {
    label: string;
    onClick: () => void;
    icon?: any; // Опционально: Иконка (SVG или любой React-элемент)
};

type DropdownProps = {
    isOpen: boolean;
    onClose: () => void;
    items: DropdownItem[];
    anchorRef: React.RefObject<HTMLElement>;
};

export const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, items, anchorRef }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Закрытие при клике вне меню
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && isOpen) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const anchorRect = anchorRef.current?.getBoundingClientRect();
    const top = anchorRect ? anchorRect.bottom + window.scrollY - 40 : 0; // Сдвигаем вверх на 10px
    const left = anchorRect ? anchorRect.left + window.scrollX + 40 : 0;

    return ReactDOM.createPortal(
        <div
            ref={dropdownRef}
            className={styles.dropdown}
            style={{ top, left }}>
            <div className={styles.menu}>
                {items.map((item, id: number) => (
                    <div
                        key={id}
                        className={`${styles.menuItem} ${id === 5 ? styles.firstItem : ''} ${id === 6 ? styles.firstItem : ''} ${id === 0 ? styles.firstItem : ''} ${
                            id === 4 ? styles.firstItem : ''
                        }`}
                        onClick={() => {
                            item.onClick();
                            onClose();
                        }}>
                        {item.icon && <img className={styles.iconWrapper} src={item.icon} alt="icon" />}
                        <span className={styles.menuText}>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement
    );
};
