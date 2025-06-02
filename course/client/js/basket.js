async function fetchData() {
    if (!localStorage.getItem('token')) {
        alert('Корзина доступна только для авторизованных пользователей!');
        window.location.replace('regInp.html');
    } else {
        const userId = localStorage.getItem('user');
        try {
            const response = await fetch(`http://localhost:3000/data-basket/${userId}`);
            const data = await response.json();
            renderData(data.rows);
        } catch (error) {
            console.log(error);
        }
    }
}
document.addEventListener('DOMContentLoaded', fetchData);

function renderData(items) {

    const grid = document.getElementById('cart-content');
    const total = document.getElementById('total-count');
    if(items.length === 0){
        grid.innerHTML =`
                <div class="basket">
                    <h4>Корзина пуста</h4>
                </div>`;
    }
    else {
        let totalCount = 0;
        items.map(item =>
            totalCount += item.price * item.count
        );
        total.innerHTML = `
            <div>
                <p>Всего к оплате: ${totalCount} ₽</p>
                <button class="buy" onclick="alert('Данная функция находится в разработке')">Заказать</button>
            </div>
        `;
        grid.innerHTML = items.map(item => `
                <div class="basket_card">
                    <h3>${item.brand} ${item.series}</h3>
                    <img src="/client${item.link_img}">
                   
                    <ul>
                        <h3 class="price">Цена: ${item.price} ₽</h3>
                        <h4>Характеристики</h4>
                        <li>Оперативная память: ${item.ram}</li>
                        <li>Встроенная память: ${item.rom}</li>
                        <li>Операционная система: ${item.operating_system}</li>
                        <li>Количество ядер процессора: ${item.number_cores}</li>
                        <li>Максимальная частота процессора: ${item.max_processor_frequency}</li>
                        <li>Количество основных (тыловых) камер: ${item.namber_cameras}</li>
                        <li>Количество мегапикселей основнойкамеры: ${item.number_megapixels}</li>
                        <li>Количество мегапикселей фронтальной камеры: ${item.number_megapixels_front_camera}</li>
                    </ul>
                    
                    <div class="reduce-increase">
                        <button class="reduce" onclick="change_reduce(${item.productid}, ${item.customerid});">-</button>
                        <div class="count">${item.count}</div>
                        <button class="increase" onclick="change_increase(${item.productid}, ${item.customerid});">+</button>
                    </div>
                    <button class="del" onclick="del(${item.productid}, ${item.customerid});">Удалить</button>
                    <button class="buy" onclick="alert('Данная функция находится в разработке')">Заказать</button>
                </div>
            `).join('');
    }
}
function del(productid, customerid){
    const data = {
        productid: productid,
        customerid: customerid
    };
    fetch('http://localhost:3000/product-delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            if(result.message === "true"){
                location.reload();
            }else{
                alert("Ошибка");
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}
function change_reduce(productid, customerid){
    const data = {
        productid: productid,
        customerid: customerid
    };
    fetch('http://localhost:3000/reduce', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            if(result.message === "true"){
                location.reload();
            }else{
                alert("Ошибка");
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}
function change_increase(productid, customerid) {
    const data = {
        productid: productid,
        customerid: customerid
    };
    fetch('http://localhost:3000/increase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            if(result.message === "true"){
                location.reload();
            }else{
                alert("Ошибка");
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}