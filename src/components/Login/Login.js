import './Login.css';
import { useEffect, useState } from 'react';
import { signUpWithEmail, signInWithEmail, checkForReturningUser } from '../../utils/firebase';

function Login({setIsUserLoaded}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect( ()=> {
        checkReturningUser2();
    },[])

    const checkReturningUser2 = async () => {
        const user = await checkForReturningUser();
        console.log("returning",user);
        if (user) setIsUserLoaded(true);
    };

    const signUp = async () => {
        const user = await signUpWithEmail(email, password);
        if (user) setIsUserLoaded(true);
    }
    const signIn = async () => {
        const user = await signInWithEmail(email, password);
        if (user) setIsUserLoaded(true);
    }

    return (
        <section id="login">
            <h3>Login</h3>
            Sign up:
            <input 
                id="signup-email" 
                placeholder="email" 
                value={email} 
                onChange={(e)=>{ setEmail(e.target.value) }}
            />
            <input  
                type="password"
                id="signup-password" 
                placeholder="password" 
                value={password} 
                onChange={(e)=>{ setPassword(e.target.value) }}
            />
            <button onClick={signUp}>Sign Up</button>
            <button onClick={signIn}>Sign In</button>


        {/* <button onClick={()=> {signInWithGoogle(loadUserData)}}>Sign In</button>
        <button onClick={signOutUser}>Sign Out</button> */}
        </section>
    );
}

export default Login;



