import './Login.css';
import { useState } from 'react';
import { useData } from '../../utils/DataContext';

function Login({setIsUserLoaded}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signUpWithEmail, signInWithEmail, signOutUser, userData } = useData();

    const signUp = () => {
        signUpWithEmail(email, password);
    }
    const signIn = () => {
        signInWithEmail(email, password);
    }
    const signOut = () => {
        signOutUser();
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
            <button onClick={signOut}>Sign Out</button> 
            {userData?.name || "---"}


        {/* <button onClick={()=> {signInWithGoogle(loadUserData)}}>Sign In</button>
        <button onClick={signOutUser}>Sign Out</button> */}
        </section>
    );
}

export default Login;



