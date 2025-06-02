const input = document.querySelector('#inp_form');
const r = document.querySelector('#reg');
const i = document.querySelector('#inp');
const registration = document.querySelector('#reg_form')
const exit = document.getElementById('exit');

r.onclick = function () {
    input.style.display = 'none';
    registration.style.display = 'block';
};
i.onclick = function () {
    registration.style.display = 'none';
    input.style.display = 'block';
};

document.getElementById('registration').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email= document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const data = {
        username: username,
        email: email,
        phone: phone,
        password: password
    };
    fetch('http://localhost:3000/reg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }) .then(response => response.json())
       .then(result => {
           if(result.message === "false"){
               alert("Пользователь уже существует!");

           }else{
               alert(result.message);
               localStorage.setItem('token', result.message);
               localStorage.setItem('user', username);
               alert("Вы успешно Зарегистрировались!");
               goBack();
           }
       })
       .catch(error => {
           console.error('Ошибка:', error);
       });



});
document.getElementById('input').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('name_user').value;
    const password = document.getElementById('pass').value;
    const data = {
        username: username,
        password: password
    };
    fetch('http://localhost:3000/inp', {
           method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),

    }) . then(response => response.json())
      .then(result => {
            if(result.message === "false"){
                alert("Неверные данные!");
            }else{
                localStorage.setItem('token', result.message);
                localStorage.setItem('user', username);
                alert("Вы успешно вошли в систему!");
                goBack();
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
});

function goBack(){
    window.history.back();
}

