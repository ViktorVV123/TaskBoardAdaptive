import React, {useState} from 'react';
import styles from './Header.module.css';
import menu from '../../app/icons/menu.svg';
import account from '../../app/icons/account.svg';
import sittings from '../../app/icons/settings.svg';
import cloud from '../../app/icons/cloud_upload.svg';
import vertical from '../../app/icons/vertical.svg';
import {Menu} from "../menu/Menu";

export const Header = () => {

    const [openMenu, setOpenMenu] = useState(false);

    const openMenuHandler = () => {
        setOpenMenu(true)
    }
    const closeMenuHandler = () => {
        setOpenMenu(false)
    }

    return (
        <div className={styles.header}>
            {/* Левый блок: меню */}
            <div className={styles.menu} onClick={openMenuHandler}>
                <img src={menu} alt="menu"/>
            </div>
                <p className={styles.p}>
                    Добавь Заметку
                </p>
            {/* Центр: input и settings */}
            <div className={styles.inputContainer}>
                <input type="text" placeholder="Search"/>
            </div>
            {/* Правый блок: account */}
            <div className={styles.account}>
                <div className={styles.iconTrio}>
                    <img src={cloud} alt="cloud"/>
                    <img src={vertical} alt="vertical"/>
                    <img src={sittings} alt="settings"/>
                </div>
                <div>
                    <img src={account} alt="account"/>
                </div>
            </div>
            <Menu openMenu={openMenu} closeMenuHandler={closeMenuHandler} />
        </div>
    );
};
