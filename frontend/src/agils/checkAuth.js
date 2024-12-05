function checkAuth() {
   if(localStorage.getItem('token') !== null)
   {
      return true;
   };
}
export default checkAuth;