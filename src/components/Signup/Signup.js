import './Signup.css';
import { useState } from 'react';
import { useData } from '../../utils/DataContext';

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [character, setCharacter] = useState("");
    const [color, setColor] = useState("");

    const { signUpWithEmail } = useData();

    const signUp = () => {
        signUpWithEmail(email, password, username, character, color);
    }

    return (
        <section id="signup">
            <h3>Sign up</h3>
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
            <input 
                id="signup-username" 
                placeholder="username" 
                value={username} 
                onChange={(e)=>{ setUsername(e.target.value) }}
            />
            <input 
                id="signup-character" 
                placeholder="?" 
                value={character}
                onChange={(e)=>{ setCharacter(e.target.value) }}
            />
            <input 
                id="signup-color" 
                placeholder="hex color" 
                value={color} 
                onChange={(e)=>{ setColor(e.target.value) }}
            />
            <button onClick={signUp}>Sign Up</button>
        </section>
    );
}

export default Signup;



