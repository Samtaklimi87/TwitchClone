import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Auth = () => {
    const[cookies , setCookies]= useCookies(['user']);
    const[username, setUsername] = useState(null);
    const[password, setPassword] = useState(null);
    const[passwordConfirm, setConfirmPassword] = useState(null);
    const[error , setError] = useState(false);
    const [isLogin, setLogin] = useState(true);

    console.log(username);
    console.log(password);

    const handelSubmit = async() => {
        console.log('submited');
        if (password !== passwordConfirm && !isLogin) {
            setError(true);
            return;
        }
        const response = await axios.post(`http://localhost:8000/signup` , {
            username,
            password
        })
        console.log(response)

        setCookies('Name' , response.data.username);
        setCookies('HashedPassword' , response.data.hashedPassword);
        setCookies('userId' , response.data.userId);
        setCookies('AuthToken ' , response.data.token);


    }
    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <div className="auth-container-form">
                    <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={(a) => setUsername(a.target.value)}
                    />

                    <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={(a) => setPassword(a.target.value)}
                    />

                    {!isLogin && <input
                    type="text"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    onChange={(a) => setConfirmPassword(a.target.value)}
                    />}
                    {/* {error && <p>there is an error occured !!</p>} */}
                    <button className="submit-buttom" onClick={handelSubmit}>
                        submit
                    </button>
                    {error && <p className='ptag'>there is an error occured !!</p>}
                </div>
                <div className="auth-option">
                    <button 
                    style= {{backgroundColor: !isLogin ? '#070a0d ' : '#242527' }}
                    onClick={() => setLogin(true)}>Login</button>
                    <button 
                    onClick={() => setLogin(false)}
                    style= {{backgroundColor: isLogin ? '#070a0d ' : '#242527' }}
                    >Register</button>

                </div>
            </div>
            
        </div>
    )
} 
export default Auth;