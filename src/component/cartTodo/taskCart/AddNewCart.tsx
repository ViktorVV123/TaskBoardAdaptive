// AddNewCart.tsx
import React, {useEffect, useRef, useState} from 'react';
import DatePicker from 'react-datepicker';
import { Check } from '../../../app/icons/Check';
import { Cicle } from '../../../app/icons/Cicle';
import { Calendar } from '../../../app/icons/Calendar';
import { LabelIcon } from '../../../app/icons/LabelIcon';
import { Attach } from '../../../app/icons/Attach';
import point from '../../../app/icons/points.svg';
import dropDown from '../../../app/icons/dropDown.svg';
import deleteIcon from '../../../app/icons/delete.svg';
import { typeAddNew } from '../../main/Main';
import styles from './TaskStyle.module.css';
import 'react-datepicker/dist/react-datepicker.css';

type AddNewCartProps = {
    addNew: typeAddNew[];
    setChangeImage: (value: boolean) => void;
    toggleTaskCompleted: (taskId: string | number) => void;
    deleteTask: (id: string | number) => void;
    dropIconId: string | number | null;
    setDropIconId: (value: string | number | null) => void;
    setOpen: (value: boolean) => void;
};

export const AddNewCart: React.FC<AddNewCartProps> = ({
                                                          addNew,
                                                          dropIconId,
                                                          setDropIconId,
                                                          setOpen,
                                                          setChangeImage,
                                                          deleteTask,
                                                          toggleTaskCompleted,
                                                      }) => {
    const [activePointerId, setActivePointerId] = useState<string | number | null>(null);
    const [activeDeleterId, setActiveDeleteId]  = useState<string | number | null>(null);
    const [compledetActive, setCompledetActive]  = useState(false);
    const [calendarForId, setCalendarForId]      = useState<string | number | null>(null);
    const [dates, setDates]                      = useState<Record<string | number, Date>>({});

    // ref для текущей обёртки календаря
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // клик вне календаря — закрываем
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (calendarForId !== null
                && wrapperRef.current
                && !wrapperRef.current.contains(event.target as Node)
            ) {
                setCalendarForId(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [calendarForId]);

    const incompleteTasks = addNew.filter(item => !item.completed);
    const completedTasks  = addNew.filter(item => item.completed);

    const compledetActiveHandler = () => setCompledetActive(v => !v);
    const openTestHandler      = (id: string | number) => { setDropIconId(id); setOpen(false); };
    const handleCalendarClick  = (id: string | number) =>
        setCalendarForId(v => (v === id ? null : id));

    return (
        <div style={{ width: 260 }}>
            {incompleteTasks.map(item => (
                <div
                    key={item.id}
                    className={`${styles.cartTask} ${dropIconId === item.id ? styles.active : ''}`}
                >
                    <div
                        onClick={() => toggleTaskCompleted(item.id)}
                        onMouseEnter={() => setChangeImage(true)}
                        onMouseLeave={() => setChangeImage(false)}
                    >
                        {item.completed ? <Check /> : <Cicle />}
                    </div>

                    <div
                        onMouseEnter={() => setActivePointerId(item.id)}
                        onMouseLeave={() => setActivePointerId(null)}
                        style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
                    >
                        <div
                            className={styles.textContent}
                            onClick={() => openTestHandler(item.id)}
                            style={{ width: '70%', display: 'flex', flexDirection: 'column', gap: 5 }}
                        >
                            <div className={styles.taskTitle}>
                                {item.title}
                            </div>
                            <div className={styles.taskDescription}>
                                {item.description}
                            </div>
                            {dates[item.id] && (
                                <div className={styles.taskDate}>
                                    {dates[item.id].toLocaleDateString()}
                                </div>
                            )}

                            {dropIconId === item.id && (
                                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                                    <div
                                        className={styles.calendarWrapper}
                                        ref={calendarForId === item.id ? wrapperRef : null}
                                    >
                                        <div  style={{ cursor: 'pointer' }}   onClick={() => handleCalendarClick(item.id)}>
                                            <Calendar


                                            />
                                        </div>

                                        {calendarForId === item.id && (
                                            <div className={styles.calendarDropdown}>
                                                <DatePicker
                                                    inline
                                                    selected={dates[item.id] || new Date()}
                                                    onChange={date =>
                                                        setDates(prev => ({ ...prev, [item.id]: date! }))
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <LabelIcon />
                                    <Attach />
                                </div>
                            )}
                        </div>

                        {activePointerId === item.id && (
                            <div style={{ cursor: 'pointer' }}>
                                <img src={point} alt="point" />
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {completedTasks.length > 0 && (
                <div
                    className={styles.completedHeader}
                    onClick={compledetActiveHandler}
                    style={{
                        display: 'flex',
                        marginTop: 12,
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                    }}
                >
                    Completed({completedTasks.length})
                    <img
                        src={dropDown}
                        alt="dropDown"
                        style={{
                            transform: compledetActive ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                        }}
                    />
                </div>
            )}

            {compledetActive &&
                completedTasks.map(item => (
                    <div
                        key={item.id}
                        onMouseEnter={() => setActiveDeleteId(item.id)}
                        onMouseLeave={() => setActiveDeleteId(null)}
                        className={styles.cartTask}
                    >
                        <div
                            className={styles.iconWrapper}
                            onClick={() => toggleTaskCompleted(item.id)}
                            onMouseEnter={() => setChangeImage(true)}
                            onMouseLeave={() => setChangeImage(false)}
                        >
                            {item.completed ? <Check /> : <Cicle />}
                        </div>
                        <div className={styles.textContent} style={{ textDecoration: 'line-through' }}>
                            <div className={styles.taskTitle} style={{ color: 'grey' }}>
                                {item.title}
                            </div>
                            {activeDeleterId === item.id && (
                                <img
                                    src={deleteIcon}
                                    alt="delete"
                                    style={{ width: 18, cursor: 'pointer' }}
                                    onClick={() => deleteTask(item.id)}
                                />
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};