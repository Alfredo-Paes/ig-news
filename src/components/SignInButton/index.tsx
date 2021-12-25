import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss';

export function SignInButton() {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    function handleButtonLogin () {
        setIsUserLoggedIn(!isUserLoggedIn);
    }

    return (
        <button 
            type="button"
            className={styles.signInbutton}
            onClick={() => handleButtonLogin()}
        >
            <FaGithub color={isUserLoggedIn ? '#04d361' : '#eba417'} />
            {isUserLoggedIn ? (<>Alfredo<FiX className={styles.closeIcon}/></>) : 'Sign in with Github'}

        </button>
    );
}