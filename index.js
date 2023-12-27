const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://my_todo_l1st.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// Middleware для обработки JSON данных
app.use(express.json());

let nextId = 1
const namesArray = [
    {
        id: nextId++,
        name: 'Ramzidin',
        age: 13,
        img: 'https://i.ibb.co/jZLBgsQ/photo-2-2023-12-27-13-38-23.jpg'
    },
    {
        id: nextId++,
        name: 'Abdulloh',
        age: 16,
        img: 'https://i.ibb.co/kK3hHZL/photo-1-2023-12-27-13-38-23.jpg'
    }
]; // Пример массива имен

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json'); // Установка заголовка ответа
    res.json(namesArray);
});

app.put('/user', (req, res) => {
    const { name, age, img } = req.body;

    // Валидация данных (в данном примере просто проверка на наличие данных)
    if (!name || !age || !img) {
        return res.status(400).json({ message: 'Name, age and img are required' });
    }

    // Обновление данных
    namesArray.push({
        id: nextId++,
        name: name,
        age: age,
        img: img,
    })

    // Отправка ответа
    return res.status(200).json({ message: 'User data updated successfully' });
});

app.delete('/delete', (req, res) => {
    const { name } = req.body;

    // Находим индекс элемента с нужным именем в массиве данных
    const index = namesArray.findIndex(item => item.name === name);

    if (index !== -1) {
        // Удаляем элемент из массива
        namesArray.splice(index, 1);
        res.status(200).json({ message: 'Deleted successfully' });
    } else {
        res.status(404).json({ message: 'Element not found' });
    }
});


// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
