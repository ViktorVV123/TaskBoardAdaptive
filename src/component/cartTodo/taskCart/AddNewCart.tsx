import React from 'react';
import { Check } from "../../../app/icons/Check";
import { Cicle } from "../../../app/icons/Cicle";
import { typeAddNew } from "../../main/Main";
import styles from './TaskStyle.module.css'

type AddNewCartProps = {
    addNew: typeAddNew[];
    setChangeImage: (value: boolean) => void;
    toggleTaskCompleted: (taskId: string | number) => void;
};

export const AddNewCart = ({ addNew, setChangeImage, toggleTaskCompleted }: AddNewCartProps) => {
    // Разбиваем задачи на невыполненные и выполненные
    const incompleteTasks = addNew.filter(item => !item.completed);
    const completedTasks = addNew.filter(item => item.completed);

    return (
        <div>
            {incompleteTasks.map(item => (
                <div key={item.id} className={styles.cartTask}>
                    <div
                        className={styles.iconWrapper}
                        onClick={() => toggleTaskCompleted(item.id)}
                        onMouseEnter={() => setChangeImage(true)}
                        onMouseLeave={() => setChangeImage(false)}
                    >
                        {item.completed ? <Check color="currentColor" /> : <Cicle />}
                    </div>
                    <div className={styles.textContent}>
                        <div className={styles.taskTitle}>{item.title}</div>
                        <div className={styles.taskDescription}>{item.description}</div>
                    </div>
                </div>
            ))}
            {completedTasks.length > 0 && (
                <div className={styles.completedHeader}>
                    Completed({completedTasks.length})
                </div>
            )}
            {completedTasks.map(item => (
                <div key={item.id} className={styles.cartTask}>
                    <div
                        className={styles.iconWrapper}
                        onClick={() => toggleTaskCompleted(item.id)}
                        onMouseEnter={() => setChangeImage(true)}
                        onMouseLeave={() => setChangeImage(false)}
                    >
                        {item.completed ? <Check color="currentColor" /> : <Cicle />}
                    </div>
                    <div className={styles.textContent} style={{textDecoration:'line-through'}}>
                        <div className={styles.taskTitle} style={{color:'grey'}}>{item.title}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
