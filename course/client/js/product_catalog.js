const categoryFilter = document.getElementById('category-filter');
const ramFilter = document.getElementById('ram');
const minPriceFilter = document.getElementById('min-price-filter');
const maxPriceFilter = document.getElementById('max-price-filter');
const romFilter = document.getElementById('rom');
const applyFiltersButton = document.getElementById('apply-filters');
async function fetchData() {
    try {
        const url = `http://localhost:3000/data`;
        const response = await fetch(url);
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}
function renderData(data) {
    const grid = document.getElementById('grid');
    grid.innerHTML = data.map(item => `
    <div class = 'product-card' >
              <div onclick="show(${item.id})" >
                  <img  src = '/client${item.link_img}'>
                   <h3>${item.brand} ${item.series}</h3>
                   <h4 class = 'price'>Цена: ${item.price} ₽</h4>
               </div>
              <button class = "card__add" onclick="add(${item.id});">В корзину</button>
          </div>
          `).join('');

}
function showProduct(data) {
    const item = document.getElementById('item')
    item.style.display = 'block';
    item.innerHTML = data.map(item => `
    <div class = 'p' >
        <img  src = '/client${item.link_img}'>
        <h3>${item.brand} ${item.series}</h3>
        <h3>Цена: ${item.price} ₽</h3>
        
        <ul>  
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
        <button class ="button_close" onclick="item.style.display = 'none'">x</button>
        <button class = "card__add" onclick="add(${item.id});">В корзину</button>
    </div>
          `).join('');

}
applyFiltersButton.addEventListener('click', async () => {
    try {
        const filters = {
            category: categoryFilter.value,
            ram: ramFilter.value,
            rom: romFilter.value,
            minPrice: minPriceFilter.value,
            maxPrice: maxPriceFilter.value
        };
        const response = await fetch('http://localhost:3000/data-filters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters),

        });
        if (!response.ok) {

            const message = `HTTP error! Status: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        renderData(data);
    } catch (err) {
        alert(err);
    }

});

document.addEventListener('DOMContentLoaded', fetchData);

 async function add(id) {
     if (!localStorage.getItem('token')) {
         alert('Корзина доступна только для авторизованных пользователей!');

     } else {

         const data = {
             username: localStorage.getItem('user'),
             id: id
         };
        fetch('http://localhost:3000/product-add', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(data),

         })
             . then(response => response.json())
             .then(result => {
                 if(result.message === "true"){

                     alert("Товар добавлен в корзину!");
                 }else{
                     alert("Ошибка");

                 }
             })
             .catch(error => {
                 console.error('Ошибка:', error);
             });
     }
 }
async function show(id){
    try{
        const item = document.getElementById('item')
        item.style.display = 'block';
        const response = await fetch(`http://localhost:3000/product/${id}`);
        const data = await response.json();
        showProduct(data);
    }catch (err){
        alert(err);
    }
}
