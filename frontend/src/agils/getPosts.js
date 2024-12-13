export const getPosts = async () => {
    try {
        const response = await fetch('http://localhost:5000/posts', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        });

        if (response.ok) {
            const posts = await response.json();
            return posts;
        } else {
            console.error('Failed to get posts');
            return response;
        }
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}