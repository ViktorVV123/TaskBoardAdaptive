import React, {useState} from 'react';
import styles from './Main.module.css';
import smile from '../../app/icons/smileFirst.svg';
import {AddIcon} from "../../app/icons/AddIcon";

import {v1} from "uuid";
import {CartTodo} from "../cartTodo/CartTodo";
import {Header} from "../header/Header";


export type typeAddNew = {
    id: string | number;
    title: string;
    description: string;
    status: string;
    boardId?: string;
    completed?: boolean;
};

export type typeAddNewBoard = {
    id: string;
    title: string;

};

export const Main = () => {
    const [data, setData] = useState<typeAddNewBoard[]>([
        {id: '1', title: 'My Tasks'},
    ]);

    const [changeImage, setChangeImage] = useState(false);
    const [addNew, setAddNew] = useState<typeAddNew[]>([]);
    const [searchTerm, setSearchTerm] = useState('');


    // Фильтрация досок по поисковому запросу (по заголовку)
    const filteredData = data.filter(board =>
        board.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

// Функция добавления новой задачи; вызывается из карточки с локальными значениями
    const addNewHandler = (boardId: string, title: string, details: string, completed: boolean) => {
        if (title.trim() === '') return;
        setAddNew([...addNew, {title, description: details, id: v1(), status: '', boardId, completed: completed}]);
    };


    // Добавление новой доски по клику на заголовок
    const addNewBoardHandler = () => {
        setData([...data, {id: v1(), title: 'New Board'}]);
    };

    // Удаление доски (карточки)
    const deleteNewBoardHandler = (id: string) => {
        setData(data.filter((elem) => elem.id !== id));
    };
// Функция переключения состояния completed для конкретной задачи
    const toggleTaskCompleted = (taskId: string | number) => {
        setAddNew(
            addNew.map((task) =>
                task.id === taskId ? {...task, completed: !task.completed} : task
            )
        );
    };

    // Функция обновления названия доски
    const updateBoardTitle = (boardId: string, newTitle: string) => {
        setData(data.map(element => element.id === boardId ? {...element, title: newTitle} : element));
    }

    const duplicateBoardHandler = (boardId: string) => {
        const boardToDublicate = data.find(board => board.id === boardId);
        if (boardToDublicate) {
            const newBoardDublicate = {...boardToDublicate, id: v1()};
            setData([...data, newBoardDublicate])
            const tasksToDuplicate = addNew.filter(task => task.boardId === boardId);
            const duplicatedTasks = tasksToDuplicate.map(task => ({
                ...task,
                id: v1(),
                boardId: newBoardDublicate.id,
            }));
            setAddNew([...addNew, ...duplicatedTasks]);
        }

    }

    return (
        <div>
            <Header searchTerm={searchTerm}  setSearchTerm={setSearchTerm} />
            <div className={styles.containerMain}>
                <div className={styles.containerSmile}>
                    <h3 onClick={addNewBoardHandler} className={styles.titleBoard}>Main Board</h3>
                    <div>
                        <AddIcon color={'currentColor'} width={'20'}/>
                    </div>
                    <img className={styles.imgSmile} src={smile} alt="Smile"/>
                </div>
                <div className={styles.scrollManyCart} style={{display: 'flex', gap: 30}}>
                    {filteredData.map((item) => (
                        <CartTodo
                            duplicateBoardHandler={duplicateBoardHandler}
                            updateBoardTitle={updateBoardTitle}
                            toggleTaskCompleted={toggleTaskCompleted}
                            key={item.id}
                            changeImage={changeImage}
                            setChangeImage={setChangeImage}
                            item={item}
                            addNewHandler={addNewHandler}
                            addNew={addNew.filter((task) => task.boardId === item.id)}
                            deleteNewBoardHandler={deleteNewBoardHandler}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
