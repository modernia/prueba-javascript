import jwtDecode from 'jwt-decode';

export function setToken(token) {
  if (typeof window !== "undefined") {
    console.log(token)

    localStorage.setItem('token', token);
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    localStorage.getItem('token');
  }
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem('token')
  }
}

export function decodeToken(token) {

  return jwtDecode(token);
}

