import React, { useState, useRef, useEffect } from 'react';
import styles from './DropdownProvider.module.css';
import swap from "../../app/icons/swap_vert.svg";
import duplicate from "../../app/icons/dublicate.svg";
import edit from "../../app/icons/edit.svg";
import deletes from "../../app/icons/delete.svg";

type DropdownItem = {
    label: string;
    icon?: string;
    onClick?: () => void;
    isDivider?: boolean;
    isHeader?: boolean;
};

type DropdownProps = {

    trigger: React.ReactNode;
    position?: 'left' | 'right';
    top: number;
    setIsEditing: (isOpen: boolean) => void;
    deleteNewBoardHandler:(id: string) => void;
    boardId: string; // передаём идентификатор доски, которую нужно удалить
    duplicateBoardHandler:(id: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({duplicateBoardHandler,top,boardId,deleteNewBoardHandler,setIsEditing, trigger, position = 'left' }) => {
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
                    style={{ top }}
                    className={`${styles.dropdownMenu} ${
                        position === 'left' ? styles.dropdownMenuLeft : styles.dropdownMenuRight
                    }`}
                >
                    {/* Для каждого элемента устанавливаем onClick, который выполняет действие и закрывает меню */}
                    <div
                        className={styles.dropdownItem}
                        onClick={() => {
                            console.log('Custom order');
                            closeDropdown();
                        }}
                    >
                        <img src={swap} alt="swap"/>
                        <div>Custom order</div>
                    </div>
                    <div
                        className={styles.dropdownItem}
                        onClick={() => {
                            duplicateBoardHandler(boardId);
                            setIsOpen(false);
                        }}
                    >
                        <img src={duplicate} alt="duplicate"/>
                        <div>Duplicate</div>
                    </div>
                    <div
                        className={styles.dropdownItem}
                        onClick={() => {
                            setIsEditing(true);
                            setIsOpen(false);
                        }}
                    >
                        <img src={edit} alt="edit"/>
                        <div>Rename list</div>

                    </div>
                    <div
                        className={styles.dropdownItem}
                        onClick={() => {
                            deleteNewBoardHandler(boardId);
                            setIsOpen(false);
                        }}
                    >
                        <img src={deletes} alt="deletes"/>
                        <div >Delete list</div>
                    </div>
                </div>
            )}
        </div>
    );
};
