import React from 'react';
import styles from './Menu.module.css';

type MenuProps = {
    openMenu: boolean;
    closeMenuHandler: () => void;
};

export const Menu: React.FC<MenuProps> = ({openMenu, closeMenuHandler}) => {
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        closeMenuHandler();
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div
            className={`${styles.container} ${openMenu ? styles.active : ''}`}
            onClick={handleOutsideClick}
        >
            <div
                className={`${styles.modal} ${openMenu ? styles.active : ''}`}
                onClick={handleModalClick}>
                <div>
                    <div className={styles.paddingTitle}>
                        <h3 className={styles.titleMenu}>Контент вашего меню</h3>
                    </div>

                    <div className={styles.line}></div>
                </div>
            </div>
        </div>
    );
};
