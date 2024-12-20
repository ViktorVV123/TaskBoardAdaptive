import React, {useRef, useState} from 'react';
import styles from './Main.module.css'
import smile from '../../app/icons/smileFirst.svg'
import point from '../../app/icons/points.svg'
import {taskType} from "../../App";
import {AddIcon} from "../../app/icons/AddIcon";

import edit from '../../app/icons/edit.svg'
import swap from '../../app/icons/swap_vert.svg'
import deletes from '../../app/icons/delete.svg'
import duplicate from '../../app/icons/dublicate.svg'
import {v1} from "uuid";
import {Dropdown} from "../dropList/DropdownProvider";


type Props = {
    tasks: taskType[]
    setTasks: (tasks: taskType[]) => void
}

export const Main = ({tasks, setTasks}: Props) => {

    const [data] = useState([
        {id: 1, title: 'My Tasks', description: '', status: ''}
    ]);

    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const dropdownItems = [
        {id: 1,label: 'Custom order', onClick: () => console.log('Custom order'), icon: swap },
        {id: 2,label: 'Due date', onClick: () => console.log('Due date')},
        {id: 3,label: 'Alphabetical', onClick: () => console.log('Alphabetical')},
        {id: 4,label: 'Last updated', onClick: () => console.log('Last updated')},
        {id: 5,label: 'Duplicate list', onClick: () => console.log('Duplicate'), icon: duplicate},
        {id: 6,label: 'Rename list', onClick: () => console.log('Rename'), icon: edit},
        {id: 7,label: 'Delete list', onClick: () => console.log('Delete'), icon: deletes},
        // Добавляйте остальные пункты меню по необходимости
    ];

    return (
        <div className={styles.containerMain}>
            <div className={styles.containerSmile}>
                <h3 className={styles.titleBoard}>
                    Main Board
                </h3>
                <img className={styles.imgSmile} src={smile} alt="Smile"/>
            </div>
            <div className={styles.containerMap}>
                {data.map((item, id) => (
                    <div key={id} className={styles.containerTask}>
                        <div className={styles.titleAndPoint}>
                            <div className={styles.titleTask}>
                                {item.title}
                            </div>

                            <Dropdown
                                top={-12}
                                items={dropdownItems}
                                trigger={<div style={{cursor: 'pointer'}}>
                                    <img style={{cursor: 'pointer'}} src={point} alt="point"/>
                                </div>}
                                position="left"
                            />
                        </div>
                        <div className={styles.addTaskContainer}>
                            <div className={`${styles.addIcon} addIcon`}>
                                <AddIcon color={'currentColor'} width={'20'}/>
                            </div>
                            <div className={styles.colorSpanTask}>
                                Add Task
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

