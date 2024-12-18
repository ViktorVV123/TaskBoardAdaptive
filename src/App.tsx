import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Header} from "./component/header/Header";

type taskType = {
  id:number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  createdAt: string;
}

function App() {

  const [tasks, setTasks] = useState<taskType[]>([]);
  const [error, setError] = useState('');





 /* useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://my.api.mockaroo.com/users.json?key=3e92d7a0');
        setTasks(response.data);
      } catch (err) {
        setError('Не удалось загрузить задачи');
        console.error(err);
      }
    };

    fetchTasks();
  }, []);*/


  return (
    <div className="App">
      <Header />
     {/* {tasks.map((task) => (
          <div>
            {task.title}
          </div>
      ))}*/}
    </div>
  );
}

export default App;
