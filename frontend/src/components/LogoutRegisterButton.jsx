//to allow me to logout from home page and register from login page


import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'

const LogoutRegisterButton = ({type, url}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate(url); 
    };

    return (
        <button onClick={handleLogout} className={type==="logout" ? "logoutButton" : "formButton"}>
            {type==="logout" ? "Logout" : "Register"}
        </button>
    );
};

export default LogoutRegisterButton;
