import './Login.css';
import { useState } from 'react';
import { useData } from '../../utils/DataContext';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signInWithEmail, signOutUser, userData } = useData();

    const signIn = () => {
        signInWithEmail(email, password);
    }
    const signOut = () => {
        signOutUser();
    }

    return (
        <section id="login">
            <h3>Login</h3>
            Sign in:
            <input 
                id="login-email" 
                placeholder="email" 
                value={email} 
                onChange={(e)=>{ setEmail(e.target.value) }}
            />
            <input  
                type="password"
                id="login-password" 
                placeholder="password" 
                value={password} 
                onChange={(e)=>{ setPassword(e.target.value) }}
            />
            <div>
            <button onClick={signIn}>Sign In</button>
            <button onClick={signOut}>Sign Out</button></div>
            <p>{userData?.username || "---"}</p>

        </section>
    );
}

export default Login;




        /* <button onClick={()=> {signInWithGoogle(loadUserData)}}>Sign In</button>
        <button onClick={signOutUser}>Sign Out</button> */