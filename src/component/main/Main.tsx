import React, {useState} from 'react';
import styles from './Main.module.css';
import smile from '../../app/icons/smileFirst.svg';
import {AddIcon} from "../../app/icons/AddIcon";
import edit from '../../app/icons/edit.svg';
import swap from '../../app/icons/swap_vert.svg';
import deletes from '../../app/icons/delete.svg';
import duplicate from '../../app/icons/dublicate.svg';
import {v1} from "uuid";
import {CartTodo} from "../cartTodo/CartTodo";
import {Cicle} from "../../app/icons/Cicle";
import {Check} from "../../app/icons/Check";
import {Attach} from "../../app/icons/Attach";
import {Calendar} from "../../app/icons/Calendar";
import {Send} from "../../app/icons/Send";
import {LabelIcon} from "../../app/icons/LabelIcon";

export type typeAddNew = {
    id: string | number;
    title: string;
    description: string;
    status: string;
    boardId?: string;
};

export type typeAddNewBoard = {
    id: string;
    title: string;
};

export const Main = () => {
    const [data, setData] = useState<typeAddNewBoard[]>([
        {id: '1', title: 'My Tasks'}
    ]);


    const [changeImage, setChangeImage] = useState(false);



    const dropdownItems = [
        {id: 1, label: 'Custom order', onClick: () => console.log('Custom order'), icon: swap},
        {id: 2, label: 'Due date', onClick: () => console.log('Due date')},
        {id: 3, label: 'Alphabetical', onClick: () => console.log('Alphabetical')},
        {id: 4, label: 'Last updated', onClick: () => console.log('Last updated')},
        {id: 5, label: 'Duplicate list', onClick: () => console.log('Duplicate'), icon: duplicate},
        {id: 6, label: 'Rename list', onClick: () => console.log('Rename'), icon: edit},
        {id: 7, label: 'Delete list', onClick: () => console.log('Delete'), icon: deletes},
    ];


    const [addNew, setAddNew] = useState<typeAddNew[]>([]);

    const [valueTitle, setValueTitle] = useState('');
    const [valueDetails, setValueDetails] = useState('');

    const valueTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueTitle(event.target.value);
    };

    const valueDetailsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueDetails(event.target.value);
    };

// Функция добавления новой задачи; вызывается из карточки с локальными значениями
    const addNewHandler = (boardId: string, title: string, details: string) => {
        if (title.trim() === '') return;
        setAddNew([...addNew, { title, description: details, id: v1(), status: '', boardId }]);
    };


    // Добавление новой доски по клику на заголовок
    const addNewBoardHandler = () => {
        setData([...data, { id: v1(), title: 'New Board' }]);
    };

    // Удаление доски (карточки)
    const deleteNewBoardHandler = (id: string) => {
        setData(data.filter((elem) => elem.id !== id));
    };


    return (
        <div className={styles.containerMain}>
            <div className={styles.containerSmile}>
                <h3 onClick={addNewBoardHandler} className={styles.titleBoard}>Main Board</h3>
                <div>
                    <AddIcon color={'currentColor'} width={'20'}/>
                </div>
                <img className={styles.imgSmile} src={smile} alt="Smile"/>
            </div>
            <div style={{display: 'flex',gap:30, flexWrap: 'wrap'}}>
                {data.map((item) => (
                    <CartTodo
                        setValueDetails={setValueDetails}
                        setValueTitle={setValueTitle}
                        key={item.id}
                        changeImage={changeImage}
                        setChangeImage={setChangeImage}
                        item={item}
                        valueTitleHandler={valueTitleHandler}
                        dropdownItems={dropdownItems}
                        valueDetailsHandler={valueDetailsHandler}
                        addNewHandler={addNewHandler}
                        valueTitle={valueTitle}
                        valueDetails={valueDetails}
                        addNew={addNew.filter((task) => task.boardId === item.id)}
                        deleteNewBoardHandler={deleteNewBoardHandler}
                    />
                ))}
            </div>
        </div>
    );
};
