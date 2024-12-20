import React, {useRef, useState} from 'react';
import styles from './Header.module.css';
import menu from '../../app/icons/menu.svg';
import account from '../../app/icons/account.svg';
import sittings from '../../app/icons/settings.svg';
import cloud from '../../app/icons/cloud_upload.svg';
import vertical from '../../app/icons/vertical.svg';
import {Menu} from "../menu/Menu";
import swap from "../../app/icons/swap_vert.svg";
import duplicate from "../../app/icons/dublicate.svg";
import edit from "../../app/icons/edit.svg";
import deletes from "../../app/icons/delete.svg";
import {Dropdown} from "../dropList/DropdownProvider";
import point from "../../app/icons/points.svg";

export const Header = () => {

    const [openMenu, setOpenMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const openMenuHandler = () => {
        setOpenMenu(true)
    }
    const closeMenuHandler = () => {
        setOpenMenu(false)
    }


    const items = [
        {id: 1, label: 'Install desktop app', onClick: () => console.log('Custom order')},
        {id: 2, label: 'Show task count', onClick: () => console.log('Due date')},
        {id: 3, label: 'Send feedback', onClick: () => console.log('Alphabetical')},
        {id: 4, label: 'Help', onClick: () => console.log('Last updated')},

        // Добавляйте остальные пункты меню по необходимости
    ];

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
                <input type="text" placeholder="Search"/>
            </div>
            {/* Правый блок: account */}
            <div className={styles.account}>
                <div className={styles.iconTrio}>
                    <img src={cloud} alt="cloud"/>
                    <img src={vertical} alt="vertical"/>
                    <Dropdown
                        items={items}
                        top={60}
                        trigger={<div style={{cursor: 'pointer'}}>
                            <img style={{cursor: 'pointer'}} src={sittings} alt="settings"/>
                        </div>}
                        position="right"
                    />
                </div>
                <div>
                    <img src={account} alt="account"/>
                </div>
            </div>
            <Menu openMenu={openMenu} closeMenuHandler={closeMenuHandler}/>
        </div>
    );
};
