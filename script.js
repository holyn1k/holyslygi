let users = [
  {
    phone: "79001112233",
    username: "@admin",
    name: "Админ Мемуслуг",
    password: "1234",
    balance: 100,
    anonymous: false,
    messages: []
  }
];

let currentUser = null;

function saveUserData() {
  localStorage.setItem("holyslygi_users", JSON.stringify(users));
}

function loadUserData() {
  const data = localStorage.getItem("holyslygi_users");
  if (data) users = JSON.parse(data);
}

function login() {
  const phone = document.getElementById("login-phone").value;
  const username = document.getElementById("login-username").value;

  currentUser = users.find(
    (u) => u.phone === phone && u.username === username
  );

  if (currentUser) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("main-section").style.display = "block";
    document.getElementById("current-name").innerText = currentUser.name;
    updateBalance();
    updateUserList();
    updateMessages();
  } else {
    alert("Пользователь не найден");
  }
}

function register() {
  const phone = document.getElementById("reg-phone").value;
  const username = document.getElementById("reg-username").value;
  const name = document.getElementById("reg-name").value;

  if (users.find((u) => u.phone === phone || u.username === username)) {
    alert("Такой номер или юзер уже зарегистрирован");
    return;
  }

  const newUser = {
    phone,
    username,
    name,
    balance: 1,
    anonymous: false,
    messages: []
  };

  users.push(newUser);
  saveUserData();
  alert("Регистрация прошла успешно! Теперь войдите.");
}

function toggleAnon() {
  currentUser.anonymous = !currentUser.anonymous;
  saveUserData();
  updateUserList();
}

function updateBalance() {
  document.getElementById("balance").innerText = `Ваш баланс: ${currentUser.balance.toFixed(2)}₽`;
}

function updateUserList() {
  const list = document.getElementById("user-list");
  list.innerHTML = "";

  users.forEach((user) => {
    if (user.username === currentUser.username) return;

    const card = document.createElement("div");
    card.className = "user-card";
    const isAnon = user.anonymous;

    card.innerHTML = `
      <strong>${user.name}</strong><br>
      Юзер: ${user.username}<br>
      Номер: ${isAnon ? "Скрыт" : user.phone}
    `;
    list.appendChild(card);
  });
}

function searchUsers() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const list = document.getElementById("user-list");
  list.innerHTML = "";

  users.forEach((user) => {
    if (
      user.username === currentUser.username ||
      (!user.username.toLowerCase().includes(query) &&
        !user.name.toLowerCase().includes(query))
    )
      return;

    const card = document.createElement("div");
    card.className = "user-card";
    const isAnon = user.anonymous;

    card.innerHTML = `
      <strong>${user.name}</strong><br>
      Юзер: ${user.username}<br>
      Номер: ${isAnon ? "Скрыт" : user.phone}
    `;
    list.appendChild(card);
  });
}

function sendMessage() {
  const msg = document.getElementById("message-input").value;
  if (!msg.trim()) return;
  currentUser.messages.push(msg.trim());
  saveUserData();
  document.getElementById("message-input").value = "";
  updateMessages();
}

function updateMessages() {
  const list = document.getElementById("message-list");
  list.innerHTML = "";
  currentUser.messages.forEach((msg) => {
    const div = document.createElement("div");
    div.innerText = "🟢 " + msg;
    list.appendChild(div);
  });
}

function addRubles(amount) {
  currentUser.balance += amount;
  saveUserData();
  updateBalance();
}

window.onload = () => {
  loadUserData();
  updateBalance();
};
