function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([$?*|{}\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}

function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

function getUserData() {
  return {
    username: getCookie('username') || 'Anon',
    balance: parseFloat(getCookie('balance')) || 1.00,
  };
}

function setUserData(data) {
  setCookie('username', data.username);
  setCookie('balance', data.balance);
            }
