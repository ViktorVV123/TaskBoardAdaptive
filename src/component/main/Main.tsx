import React, {useState} from 'react';
import styles from './Main.module.css'
import smile from '../../app/icons/smileFirst.svg'
import point from '../../app/icons/points.svg'
import {taskType} from "../../App";
import add from '../../app/icons/add.svg'
import {AddIcon} from "../../app/icons/AddIcon";

type Props = {
    tasks: taskType[]
    setTasks: (tasks: taskType[]) => void
}

export const Main = ({tasks, setTasks}: Props) => {

    const [data, setData] = useState([
        {id: 1, title: 'My Tasks', description: '', status: ''}
    ]);

    return (
        <div className={styles.containerMain}>
            <div className={styles.containerSmile}>
                <h3 className={styles.titleBoard}>
                    Main Board
                </h3>
                <img className={styles.imgSmile} src={smile} alt="Smile"/>
            </div>
            <div style={{display: 'flex', gap: 10, marginTop: 20, borderRadius: '20px'}}>
                {data.map((item, id) => (
                    <div key={id} className={styles.containerTask}>
                        <div className={styles.titleAndPoint}>
                            <div className={styles.titleTask}>
                                {item.title}
                            </div>
                            <img style={{cursor: 'pointer'}} src={point} alt="point"/>
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

