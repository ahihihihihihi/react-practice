import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import { loginApi } from "../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const Login = () => {

    const navigate = useNavigate();

    const { loginContext } = useContext(UserContext);

    const [email, setEmail] = useState("eve.holt@reqres.in")
    const [password, setPassword] = useState("123")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [loadingAPI, setLoadingAPI] = useState(false)

    // useEffect(() => {
    //     let token = localStorage.getItem("token")
    //     if (token) {
    //         navigate("/")
    //     }
    // }, [])

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email or Password is required!")
            return
        }
        setLoadingAPI(true)
        let res = await loginApi(email.trim(), password)
        if (res && res.token) {
            loginContext(email, res.token)
            navigate("/")
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingAPI(false)
        // console.log(">>> check res: ", res)

    }

    const handlePressEnter = (event) => {
        console.log(">>> check key down: ", event)
        if (event && event.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Log in</div>
                <div className="text">Email or Username (eve.holt@reqres.in)</div>
                <input type="text" placeholder="Email or Username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className="input-2">
                    <input type={isShowPassword === false ? "password" : "text"} placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handlePressEnter(event)}
                    />
                    <i
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        className={isShowPassword === false ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                </div>
                <button
                    className={email && password ? "active" : ""}
                    disabled={email && password ? false : true}
                    onClick={() => handleLogin()}

                >
                    {loadingAPI && <i className="fas fa-sync fa-spin"></i>} &nbsp;
                    login</button>
                <div className="back">
                    <Link to="/"><i className="fa-solid fa-angles-left"></i> Go back</Link>
                </div>
            </div>
        </>
    )
}

export default Login