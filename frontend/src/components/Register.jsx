import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";

import "./register.css"

const Register = ({ setShowRegister }) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            await axios.post("/users/register", newUser);
            setError(false);
            setSuccess(true);
        } catch (err) {
            setError(true);
        }
    };
    return (
        <div className="registerContainer">
            <div className="logo">
                <Room className="logoIcon" />
                <span>Travel Pin</span>
            </div>
            <form onSubmit={handleSubmit} className="registerForm">
                <input autoFocus placeholder="username" ref={usernameRef} required/>
                <input type="email" placeholder="email" ref={emailRef} required/>
                <input
                    type="password"
                    min="6"
                    placeholder="password"
                    ref={passwordRef}
                    required
                />
                <button className="registerBtn" type="submit">
                    Register
                </button>
                {success && (
                    <span className="success">Successfull. You can login now!</span>
                )}
                {error && <span className="failure">Something went wrong!</span>}
            </form>
            <Cancel
                className="registerCancel"
                onClick={() => {setShowRegister(false)}}
            />
        </div>
    );
}

export default Register