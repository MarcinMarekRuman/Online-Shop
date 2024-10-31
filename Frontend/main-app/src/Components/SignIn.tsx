
import "../styles/SignIn.css";

    const SignIn = () => {
        return (
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    <form >
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={''}
                                onChange={ () =>{}}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={''}
                                onChange={ () =>{}}
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                    <a href="/Join" className="sign-up">Sign Up</a>
                </div>
            </div>

        );
    }

export default SignIn;