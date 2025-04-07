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
import {AddNewCart} from "./AddNewCart";

type CartTodoType = {
    item: typeAddNewBoard;
    valueTitleHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    valueDetailsHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addNewHandler: (boardId: string, title: string, details: string) => void;
    dropdownItems: any;
    setChangeImage: (value: boolean) => void;
    changeImage: boolean;
    valueTitle: string;
    valueDetails: string;
    addNew: typeAddNew[];
    setValueTitle: (value: string) => void;
    setValueDetails: (value: string) => void;
    deleteNewBoardHandler: (id: string) => void;

};

export const CartTodo = ({
                             item,
                             valueTitleHandler,
                             valueDetailsHandler,
                             addNewHandler,
                             dropdownItems,

                             setChangeImage,
                             changeImage,
                             valueTitle,
                             valueDetails,
                             addNew,
                             setValueTitle,
                             setValueDetails,
                             deleteNewBoardHandler
                         }: CartTodoType) => {
    const {id, title} = item;

    const addNewHandlerTwo = () => {
        addNewHandler(id, valueTitle, valueDetails)
        setValueTitle('')
        setValueDetails('')
    }
    const [open, setOpen] = useState(false);
    const openHandler = () => {
        setOpen(!open);
    };

    return (
        <div className={styles.containerMap}>
            <div key={id} className={styles.containerTask}>
                <div className={styles.titleAndPoint}>
                    <div className={styles.titleTask}>{title}</div>
                    <Dropdown
                        top={-12}
                        items={dropdownItems}
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
                    )}
                    <AddNewCart addNew={addNew} setChangeImage={setChangeImage} changeImage={changeImage}/>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            gap: 20,
                            justifyContent: 'flex-start',
                            height: 20,
                            alignItems: 'center',
                            marginLeft: 40,
                        }}
                    >
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
            </div>
        </div>
    );
};
