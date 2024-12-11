
import '../styles/Join.css';
import {useState} from "react";


const SignIn = () =>{

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const signData={
        email,
        username,
        password
    }

    const dataSubimit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/SignData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signData),
            });

            if (response.ok) {
                console.log('User has been registered!');
            } else {
                console.log('Error while registering!');
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };



    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={dataSubimit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>User Name</label>
                        <input
                            type="string"
                            value={username}
                            onChange={(e) => {setUsername(e.target.value)}}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            required
                        />
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                </form>
                <a href="/login" className="sign-up">Sign In</a>
            </div>
        </div>

    );
}


export default SignIn;