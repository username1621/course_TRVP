const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const e = require("express");
const app = express();
const PORT = 3000;
const jwtSecret = 'jwt_secret';
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users_data',
    password: '',
    port: 5432,
});
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors({credentials: true}));
app.use(express.json());



app.get('/data', async (req, res) => {
    try {
        const query = 'SELECT * FROM products'
        const {rows} = await pool.query(query);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка получения данных' });
    }

});
app.get('/product/:id', async (req, res )=>{
    try {
        const {id} = req.params;
        const product = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );

        res.json(product.rows);
    }
    catch (err){

    }

});
app.post('/data-filters', async(req, res)=>{
    try {
        const { category, ram, rom,  minPrice,  maxPrice } = req.body;
        let query = 'SELECT * FROM products where 1 = 1'
        const values = [];
        let paramIndex = 1;
        if (category) {
            query += ` AND brand = $${paramIndex++}`;
            values.push(category);
        }
        if (ram) {
            query += ` AND ram = $${paramIndex++}`;
            values.push(ram);

        }
        if (rom) {
            query += ` AND rom = $${paramIndex++}`;
            values.push(rom);
        }
        if (minPrice) {
            query += ` AND price >= $${paramIndex++}`;
            values.push(minPrice);
        }
        if (maxPrice) {
            query += ` AND price <= $${paramIndex++}`;
            values.push(maxPrice);
        }
        const result = await pool.query(query, values);

        res.json(result.rows);
    }
    catch (error) {

        res.status(500).json({ error: 'Ошибка получения данных' });
    }
});
app.get('/data-basket/:user', async (req, res) => {
    try {
        const {user} = req.params;
        const userIdResult = await pool.query(
            'SELECT * FROM users WHERE login = $1',
            [user]
        );

        if (!userIdResult.rows || userIdResult.rows.length === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        const userId = userIdResult.rows[0].id;

        const {rows} = await pool.query(
            'SELECT * FROM cart_items JOIN products ON cart_items.productid = products.id WHERE cart_items.customerid = $1',
            [userId]
        );
        res.json({rows});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ошибка получения данных' });
    }
});
app.post('/product-delete', async (req, res) => {
    const { productid, customerid } = req.body;

    try {
        const userExists = await pool.query(
            'SELECT * FROM cart_items WHERE customerid = $1 AND productid = $2',
            [customerid, productid] // <-- Правильный порядок параметров
        );

        if (userExists.rows.length > 0) {
            // Запись существует, удаляем её
            await pool.query(
                'DELETE FROM cart_items WHERE customerid = $1 AND productid = $2',
                [customerid, productid] // <-- Правильный порядок параметров
            );
            res.json({ message: 'true' }); // Отправляем true, если удаление прошло успешно
        } else {
            // Запись не существует, сообщаем об этом
            res.json({ message: 'false' }); // Отправляем false, если удалять нечего
        }
    } catch (err) {
        console.error(err);  // Используйте console.error для ошибок
        res.status(500).json({ error: 'Ошибка удаления товара из корзины' }); // Отправляем ошибку клиенту
    }
});
app.post('/reduce', async (req, res) => {
    const { productid, customerid } = req.body;
    try {
        const userExists = await pool.query(
            'SELECT * FROM cart_items WHERE customerid = $1 AND productid = $2',
            [customerid, productid]
        );
        if (userExists.rows[0].count > 1) {
            console.log(userExists.rows[0].count);
            await pool.query('UPDATE cart_items SET count = count-1 WHERE customerid = $1 and productid = $2',
                [customerid, productid]
            );
            res.json({ message: 'true' });
        } else {
            await pool.query(
                'DELETE FROM cart_items WHERE customerid = $1 AND productid = $2',
                [customerid, productid]
            );

            res.json({ message: 'true' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка удаления товара из корзины' });
    }
});
app.post('/increase', async (req, res) => {
    const { productid, customerid } = req.body;
    try {
        const userExists = await pool.query(
            'SELECT * FROM cart_items WHERE customerid = $1 AND productid = $2',
            [customerid, productid]
        );
        if (userExists.rows[0].count >= 1) {
            console.log(userExists.rows[0].count);
            await pool.query('UPDATE cart_items SET count = count+1 WHERE customerid = $1 and productid = $2',
                [customerid, productid]
            );
            res.json({ message: 'true' });
        } else {

            res.json({ message: 'false' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка удаления товара из корзины' });
    }
});
app.post('/reg', async (req, res) => {
    const { username, email, phone, password } = req.body;
    try {

        const userExists = await pool.query(
            'SELECT * FROM users WHERE login = $1',
            [username]
        );

        if (userExists.rows.length > 0) {
            res.json({ message: 'false'});
        }else{

            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.query(
                'INSERT INTO users (login, email, phone, password) VALUES ($1, $2, $3, $4)',
                [username, email,phone,hashedPassword]
            );
            const token = jwt.sign({ username: username}, jwtSecret, { expiresIn: '1h' });
            res.json({ message: token});
        }
    } catch (err) {
        console.error('Ошибка регистрации:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }


});
app.post('/inp', async (req, res) => {
    const username = await req.body.username;
    const password = await req.body.password;
    try {
            const user = await pool.query(
                'SELECT * FROM users WHERE login = $1',
                [username]
            );
            if (user.rows.length === 0) {
                res.json({message: 'false'});
            } else {
                const isValid = await bcrypt.compare(password, user.rows[0].password);
                if (!isValid) {
                    res.json({message: 'false'});
                }else{
                    const token = jwt.sign({ username: user.rows[0].login}, jwtSecret, { expiresIn: '1h' });
                    res.json({message: token});
                }
            }
        } catch (err) {
        console.error('Ошибка авторизации:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }

});
app.post('/product-add',  async (req, res) => {
    const { id, username} = req.body;
    try {

        const user = await pool.query(
            'SELECT id FROM users WHERE login = $1',
            [username]
        );

        const cart = await pool.query(
            'SELECT * FROM cart_items WHERE customerid = $1',
            [user.rows[0].id]
        );

        const product = await pool.query(
            'SELECT * FROM cart_items WHERE productid = $1',
            [id]
        );
        if(product.rows.length !== 0 && cart.rows.length !==0){
            await pool.query('UPDATE cart_items SET count = count+1 WHERE customerid = $1 and productid = $2',
            [user.rows[0].id, id]
            );
            res.json({message: 'true'});
        }else{
            await pool.query('insert into cart_items (customerid, productid) VALUES ($1, $2)',
                [user.rows[0].id, id]
            );
            res.json({message: 'true'});
        }

    } catch (err) {
        console.error('Ошибка получения корзины:', err);
        res.status(500).json({error: 'Ошибка сервера'});
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

