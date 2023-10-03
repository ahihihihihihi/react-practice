import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';


const Login = () => {
    //demo error
    // var a = null
    // console.log(">>>check user: ", a.abc)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [email, setEmail] = useState("eve.holt@reqres.in")
    const [password, setPassword] = useState("123")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const isLoading = useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)

    useEffect(() => {
        if (account && account.auth === true) {
            navigate("/")
        }
    }, [account])

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email or Password is required!")
            return
        }

        dispatch(handleLoginRedux(email, password))

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
                    {isLoading && <i className="fas fa-sync fa-spin"></i>} &nbsp;
                    login</button>
                <div className="back">
                    <Link to="/"><i className="fa-solid fa-angles-left"></i> Go back</Link>
                </div>
            </div>
        </>
    )
}

export default Login