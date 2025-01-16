/**
 * @description 存储/获取 user token
 */

export const USER_TOKEN_KEY = "USER_TOKEN";

export function setToken(token: string) {
  localStorage.setItem(USER_TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(USER_TOKEN_KEY) || "";
}

export function removeToken() {
  localStorage.removeItem(USER_TOKEN_KEY);
}

const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

export function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

export function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

export function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

// 添加cookie
export function setCookie(key: string, value: string, maxAge?: number) {
  // 在设置cookie前进行编码操作。
  value = encodeURIComponent(value);
  if (maxAge) {
    document.cookie = `${key}=${value};max-age=${maxAge};`;
  } else {
    document.cookie = `${key}=${value};`;
  }
}

// 获取cookie。    取的所有cookie的值，格式：name=董书华;age=20;sex=男;height=170
export function getCookie(key: string) {
  var arr = document.cookie.split(";"); // ['name=董书华','age=20',...]
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      const a = arr[i].split("=");
      var index = a.findIndex(function (v) {
        return v.trim() == key;
      });
      if (index != -1) {
        // return a[1];
        return decodeURIComponent(a[1]);
      }
    }
  }
  return undefined;
}

// 删除cookie
export function removeCookie(key: string) {
  var value = getCookie(key);
  setCookie(key, value as string, -60000);
}

// 清空cookie
export function clearCookie() {
  // 找出来所有的key组成的数组  ['name','age']
  var arr = document.cookie.split(";");
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i];
    removeCookie(a.split("=")[0]);
  }
}
