import React, { useState, useRef, useEffect } from 'react';
import styles from './DropdownProvider.module.css';

type DropdownItem = {
    label: string;
    icon?: string;
    onClick?: () => void;
    isDivider?: boolean;
    isHeader?: boolean;
};

type DropdownProps = {
    items: DropdownItem[];
    trigger: React.ReactNode;
    position?: 'left' | 'right';
    top: number;
};

export const Dropdown: React.FC<DropdownProps> = ({ items, top,  trigger, position = 'left' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div onClick={toggleDropdown} className={styles.dropdownTrigger}>
                {trigger}
            </div>
            {isOpen && (
                <div
                    style={{top}}
                    className={`${styles.dropdownMenu} ${
                        position === 'left' ? styles.dropdownMenuLeft : styles.dropdownMenuRight
                    }`}
                >
                    {items.map((item, index) => {
                        if (item.isDivider) {
                            return <div key={index} className={styles.dropdownDivider}></div>;
                        }
                        if (item.isHeader) {
                            return (
                                <div key={index} className={styles.dropdownHeader}>
                                    {item.label}
                                </div>
                            );
                        }
                        return (
                            <div key={index} onClick={item.onClick} className={styles.dropdownItem}>
                                {item.icon && (
                                    <img src={item.icon} alt="icon" style={{ width: 16, height: 16 }} />
                                )}
                                <div className={styles.dropdownLabel}>{item.label}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
