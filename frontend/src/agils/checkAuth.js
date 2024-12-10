function checkAuth() {
    const token = localStorage;
    console.log('Token:', token);
 
    if (token !== null) {

       try {
          const parsedToken = JSON.parse(atob(token.split('.')[1])); // Assuming it's a JWT token
          console.log('Parsed Token:', parsedToken);
 
          // Check for a specific value in the token
          if (parsedToken && parsedToken.userId) {
             console.log('User is authenticated');
             return true;
          } else {
             console.log('Token validation failed');
             return false;
          }
       } catch (error) {
          console.log('Token parsing failed:', error);
          return false;
       }
    } else {
       console.log('User is not authenticated');
       return false;
    }
 }
 
 export default checkAuth;