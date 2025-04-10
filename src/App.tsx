import React, {useEffect, useState} from 'react';
import './App.css';
import {Header} from "./component/header/Header";
import {Main} from "./component/main/Main";
// 1) Импортируем нужные методы из firebase/database
import {ref, onValue, push, set} from "firebase/database";

// 2) Импортируем инициализированную БД
import {database} from "./app/fireBase/fireBase";
import axios from "axios";



function App() {


    return (
        <div className="App">
            <Main/>
           {/* <button onClick={addTask}>Добавить задачу</button>

             Список задач, считанных из БД
            <ul>
                {food.map((task) => (
                    <div key={task.id}>
                        {task.drinkName} - {task.cost} - {task.quantity} - {task.overview}
                        <img src={task.imageFood}/>
                        {task.comment}
                    </div>
                ))}
            </ul>*/}
        </div>
    );
}

export default App;
