import {jwtDecode} from 'jwt-decode';


  function getCookie(name) {
    const value = document.cookie;
    const parts = value.split(`; token=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    const decodedToken = jwtDecode(token);
    return decodedToken;
}

export default getCookie;