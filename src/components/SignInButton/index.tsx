import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut , useSession } from 'next-auth/react'

import styles from './styles.module.scss';

export function SignInButton() {

    const { data: session } = useSession();

    function handleButtonLogin() {
        signIn('github'); 
    }

    function handleSignOut(){
        signOut();
    }

    return (
        <button 
            type="button"
            className={styles.signInbutton}
            onClick={() => (!session ? handleButtonLogin() : handleSignOut())}
        >
            <FaGithub color={session ? '#04d361' : '#eba417'} />
            {session ? (<>{session.user?.name}<FiX className={styles.closeIcon}/></>) : 'Sign in with Github'}

        </button>
    );
}