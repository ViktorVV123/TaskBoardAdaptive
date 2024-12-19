import React, {useRef, useState} from 'react';
import styles from './Main.module.css'
import smile from '../../app/icons/smileFirst.svg'
import point from '../../app/icons/points.svg'
import {taskType} from "../../App";
import {AddIcon} from "../../app/icons/AddIcon";
import {Dropdown} from "../dropList/Dropdown";

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

    const items = [
        {label: 'Custom order', onClick: () => console.log('Custom order')},
        {label: 'Due date', onClick: () => console.log('Due date')},
        {label: 'Alphabetical', onClick: () => console.log('Alphabetical')},
        {label: 'Last updated', onClick: () => console.log('Last updated')},
        {label: 'Rename list', onClick: () => console.log('Rename')},
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
                            <div ref={buttonRef} onClick={() => setOpen(!open)} style={{cursor: 'pointer'}}>
                                <img style={{cursor: 'pointer'}} src={point} alt="point"/>
                            </div>
                            <Dropdown
                                isOpen={open}
                                onClose={() => setOpen(false)}
                                items={items}
                                anchorRef={buttonRef}
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

