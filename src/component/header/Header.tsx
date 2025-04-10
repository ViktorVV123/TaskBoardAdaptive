import React, {useRef, useState} from 'react';
import styles from './Header.module.css';
import menu from '../../app/icons/menu.svg';
import account from '../../app/icons/account.svg';
import vertical from '../../app/icons/vertical.svg';
import theme from '../../app/icons/theme.svg';
import {Menu} from "../menu/Menu";

type HeaderType = {
    setSearchTerm: (searchTerm: string) => void
    searchTerm: string
}

export const Header = ({setSearchTerm,searchTerm}:HeaderType) => {

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
                Add a Note
            </p>
            {/* Центр: input и settings */}
            <div className={styles.inputContainer}>
                <input  type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            {/* Правый блок: account */}
            <div className={styles.account}>
                <div className={styles.iconTrio}>
                    <img src={theme} alt="theme"/>
                    <img src={vertical} alt="vertical"/>

                </div>
                <div>
                    <img src={account} alt="account"/>
                </div>
            </div>
            <Menu openMenu={openMenu} closeMenuHandler={closeMenuHandler}/>
        </div>
    );
};
