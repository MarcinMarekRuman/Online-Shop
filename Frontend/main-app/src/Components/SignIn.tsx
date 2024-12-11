
import "../styles/SignIn.css";
import {useState} from 'react';

    const SignIn = () => {

            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');


            const handleLogin = async (e) => {
                e.preventDefault();
                try {
                    const response = await fetch('http://localhost:3000/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!response.ok) {
                        // console.log(response);
                        throw new Error('Login failed');
                    }

                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    alert('Logged in successfully!');
                } catch (err) {
                    // console.log(err);
                    alert('Invalid credentials');
                }
            };


            return (
                <div className="login-container">
                    <div className="login-box">
                        <h2>Login</h2>
                        <form>
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button onClick={handleLogin} className="login-btn">Login</button>
                        </form>
                        <a href="/Join" className="sign-up">Sign Up</a>
                    </div>
                </div>

            );

    }

export default SignIn;