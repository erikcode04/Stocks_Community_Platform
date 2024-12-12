import { useContext, React } from 'react';
import { AuthContext } from '../agils/checkAuth';
import '../styles/profilePage.css';

function Profile() {

  const { userInfo } = useContext(AuthContext);
  return (
    <div id='profile-container'>
      <div> 
      <h1>Profile {userInfo.userName}</h1>
      </div>
    </div>
  );
}

export default Profile;