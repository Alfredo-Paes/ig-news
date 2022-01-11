import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut , useSession } from 'next-auth/react'

import styles from './styles.module.scss';

export function SignInButton() {

    const { data: session } = useSession(); //Esse hook vai retornar se o usuário tem uma sessão ativa ou não

    function handleButtonLogin() {
        signIn('github'); // "signIn" é uma função que trabalha com uma autenticação do usuário. "github" é o tipo de autenticação que deseja utilizar
    }

    function handleSignOut(){
        signOut(); // "signOut" é uma função que trabalha para encerrar a sessão do usuário
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