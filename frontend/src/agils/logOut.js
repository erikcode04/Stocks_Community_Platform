export const handleLogout = async () => {
    try {


        const response = await fetch('http://localhost:5000/auth/logout', {
            method: 'POST',
            credentials: 'include' // Include cookies in the request
        });

        if (response.ok) {
            console.log('Logged out successfully');
            sessionStorage.clear();
            localStorage.clear();
            window.location.reload();
            return response;
        } else {
            console.error('Failed to log out');
            return response;
        }
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
};