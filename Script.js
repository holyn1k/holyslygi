function navigate(page) {
  const content = document.getElementById('content');
  const user = getUserData();

  switch (page) {
    case 'home':
      content.innerHTML = `<h2>Добро пожаловать!</h2><p>Ты в мемном портале.</p>`;
      break;

    case 'profile':
      content.innerHTML = `
        <h2>Твой мемпаспорт</h2>
        <p>Имя: ${user.username}</p>
        <p>Баланс: ${user.balance.toFixed(2)} ₽</p>
        <input id="newname" placeholder="Новое имя" />
        <button onclick="updateName()">Сохранить</button>
      `;
      break;

    case 'search':
      content.innerHTML = `
        <h2>Поиск пользователей</h2>
        <input placeholder="Введите имя" />
        <p>Фича в разработке.</p>
      `;
      break;

    case 'balance':
      content.innerHTML = `
        <h2>Твой баланс</h2>
        <p>${user.balance.toFixed(2)} ₽</p>
        <button onclick="addBalance()">Пополнить</button>
      `;
      break;
  }
}

function updateName() {
  const input = document.getElementById('newname');
  const user = getUserData();
  user.username = input.value || user.username;
  setUserData(user);
  navigate('profile');
}

function addBalance() {
  const user = getUserData();
  user.balance += 5.00;
  setUserData(user);
  navigate('balance');
}

navigate('home');
