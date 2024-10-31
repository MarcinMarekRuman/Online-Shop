
import '../styles/Join.css';
const SignIn = () =>{
    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={''}
                            onChange={() => {
                            }}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>User Name</label>
                        <input
                            type="string"
                            value={''}
                            onChange={() => {
                            }}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={''}
                            onChange={() => {
                            }}
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