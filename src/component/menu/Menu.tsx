import React from 'react';
import styles from './Menu.module.css';
import board from '../../app/icons/board.svg'
import {AddIcon} from "../../app/icons/AddIcon";

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
                        <h3 className={styles.titleMenu}>TaskBoard</h3>
                    </div>

                    <div className={styles.line}></div>

                    <div className={styles.containerList}>
                        <div style={{display: 'flex'}}>
                            <img src={board} alt="board"/>
                            <p style={{marginLeft: 10}}>MainBoard</p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>
                                <AddIcon color={'#000000'} />
                            </div>
                            <p style={{marginLeft: 10}}>AddBoard</p>
                        </div>
                    </div>
                    <div className={styles.line}></div>
                </div>
            </div>
        </div>
    );
};
