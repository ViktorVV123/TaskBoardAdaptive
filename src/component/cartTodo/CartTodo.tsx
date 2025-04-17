import React, {useState} from 'react';
import styles from "../main/Main.module.css";
import {Dropdown} from "../dropList/DropdownProvider";
import point from "../../app/icons/points.svg";
import {AddIcon} from "../../app/icons/AddIcon";
import {Check} from "../../app/icons/Check";
import {Cicle} from "../../app/icons/Cicle";
import {Calendar} from "../../app/icons/Calendar";
import {LabelIcon} from "../../app/icons/LabelIcon";
import {Attach} from "../../app/icons/Attach";
import {Send} from "../../app/icons/Send";
import {typeAddNew, typeAddNewBoard} from "../main/Main";
import {AddNewCart} from "./taskCart/AddNewCart";


type CartTodoType = {
    item: typeAddNewBoard;
    addNewHandler: (boardId: string, title: string, details: string, completed: boolean) => void;
    setChangeImage: (value: boolean) => void;
    changeImage: boolean;
    addNew: typeAddNew[];
    deleteNewBoardHandler: (id: string) => void;
    toggleTaskCompleted: (taskId: string | number) => void;
    updateBoardTitle: (boardId: string, title: string) => void
    duplicateBoardHandler: (boardId: string) => void;
    deleteTask: (id: any) => void;


};

export const CartTodo = ({
                             item,
                             addNewHandler,
                             duplicateBoardHandler,
                             setChangeImage,
                             changeImage,
                             addNew,
                             toggleTaskCompleted,
                             deleteNewBoardHandler,
                             updateBoardTitle,
                             deleteTask

                         }: CartTodoType) => {
    const {id, title} = item;

    const [valueTitle, setValueTitle] = useState('');
    const [valueDetails, setValueDetails] = useState('');
    const [completedTask, setCompletedTask] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitleBoard, setEditTitleBoard] = useState(title);
    const [dropIconId, setDropIconId] = useState<string | number | null>(null);

    const valueTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueTitle(event.target.value);
    };

    const valueDetailsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueDetails(event.target.value);
    };

    const addNewHandlerTwo = () => {
        addNewHandler(id, valueTitle, valueDetails, completedTask)
        setValueTitle('')
        setValueDetails('')
        setCompletedTask(false);
        setOpen(false);
    }

    const openHandler = () => {
        setOpen(!open);
        setDropIconId(null)
    };

    // Функция завершения редактирования названия доски
    const finishEditing = () => {
        updateBoardTitle(id, editTitleBoard);
        setIsEditing(false);
    };



    return (
        <div className={styles.containerMap}>
            <div key={id} className={styles.containerTask}>
                <div className={styles.titleAndPoint}>
                    {isEditing ? (
                        <input
                            value={editTitleBoard}
                            onChange={(e) => setEditTitleBoard(e.target.value)}
                            onBlur={finishEditing}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') finishEditing();
                            }}
                            autoFocus
                            className={styles.editTitleInput}
                        />
                    ) : (
                        <div className={styles.titleTask} onClick={() => setIsEditing(true)}>
                            {title}
                        </div>

                    )}
                    <Dropdown boardId={id}
                              top={-12}
                              setIsEditing={setIsEditing}
                              duplicateBoardHandler={duplicateBoardHandler}
                              deleteNewBoardHandler={deleteNewBoardHandler}
                              trigger={
                                  <div style={{cursor: 'pointer'}}>
                                      <img style={{cursor: 'pointer'}} src={point} alt="point"/>
                                  </div>
                              }
                              position="left"
                    />
                </div>
                <div onClick={openHandler} className={styles.addTaskContainer}>
                    <div className={`${styles.addIcon} addIcon`}>
                        <AddIcon color={'currentColor'} width={'20'} height={'24'}/>
                    </div>
                    <div></div>
                    <div className={styles.colorSpanTask}>
                        Add Task
                    </div>


                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    {open && (

                        <div style={{display: 'flex', flexDirection: 'column',gap:20}}>
                            <div className={styles.openStyle}>
                                <div
                                    className={`${styles.addIcon} addIcon`}
                                    onMouseEnter={() => setChangeImage(true)}
                                    onMouseLeave={() => setChangeImage(false)}
                                >
                                    {changeImage ? <Check color={'currentColor'}/> : <Cicle/>}
                                </div>
                                <div className={styles.containerInput}>
                                    <input
                                        className={styles.inputTitleStyle}
                                        value={valueTitle}
                                        onChange={valueTitleHandler}
                                        placeholder={'Title'}
                                    />
                                    <input
                                        className={styles.inputDetailsStyle}
                                        value={valueDetails}
                                        onChange={valueDetailsHandler}
                                        placeholder={'Details'}
                                    />
                                </div>
                            </div>
                            <div style={{width:'80%', display: 'flex', justifyContent: 'flex-start', gap:10, marginLeft:35}}>
                                <Calendar/>
                                <LabelIcon/>
                                <Attach/>
                                <div style={{display: 'flex', alignItems: 'center', height: 20}}>
                                    {valueTitle.length !== 0 && (
                                        <div style={{width: '20%'}} onClick={addNewHandlerTwo}>
                                            <Send/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <AddNewCart setOpen={setOpen} dropIconId={dropIconId} setDropIconId={setDropIconId} deleteTask={deleteTask} toggleTaskCompleted={toggleTaskCompleted} addNew={addNew}
                                setChangeImage={setChangeImage}/>
                </div>
            </div>
        </div>
    );
};
