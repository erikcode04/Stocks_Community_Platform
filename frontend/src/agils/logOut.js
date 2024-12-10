function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
}