import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Ваш объект конфигурации (из Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyB9Txl...ms9Fh0",
    authDomain: "taskboard-99f28.firebaseapp.com",
    databaseURL: "https://taskboard-99f28-default-rtdb.firebaseio.com",
    projectId: "taskboard-99f28",
    storageBucket: "taskboard-99f28.appspot.com",
    messagingSenderId: "1020619929617",
    appId: "1:1020619929617:web:88a0829b1f361d306859b0",
    measurementId: "G-ES8KZ22254"
};

// 1) Инициализируем Firebase
const app = initializeApp(firebaseConfig);

// 2) Подключаем Realtime Database
export const database = getDatabase(app);
