import React, { useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

type DropdownProps = {
    isOpen: boolean;
    onClose: () => void;
    items: { label: string; onClick: () => void }[];
    anchorRef: React.RefObject<HTMLElement>; // Ссылка на элемент, к которому привязывается меню
};

export const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, items, anchorRef }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Закрываем меню, если кликнули вне его
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
    const top = anchorRect ? anchorRect.bottom + window.scrollY : 0;
    const left = anchorRect ? anchorRect.left + window.scrollX : 0;

    return (
        <div
            ref={dropdownRef}
            className={styles.dropdown}
            style={{ top, left }}
        >
            <div className={styles.menu}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={styles.menuItem}
                        onClick={() => {
                            item.onClick();
                            onClose();
                        }}
                    >
                        {item.label}

                    </div>
                ))}
            </div>
        </div>
    );
};
