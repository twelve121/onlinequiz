import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function ModalLogin(props) {
    const { setOpenModalLogin, setOpenModalRegister } = props

    const [user, setUser] = useState({
        user_email: "",
        user_password: ""
    });
    console.log(user);
    function onTextFieldChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        console.log(user);
    }

    let navigate = useNavigate();

    const [check, setCheck] = useState(false);

    async function handleLogin() {
        let value = await axios.get("http://localhost:3333/user");
        console.log(value)
        for (let i = 0; i < value.data.length; i++) {
            if (value.data[i].user_email === user.user_email &&
                value.data[i].user_password === user.user_password) {
                setCheck(true);
                alert("success");
                sessionStorage.setItem("user", user.user_email);
                setOpenModalLogin(false);
                window.location.reload(false)
            }
        }
        if (check)
            alert(" Wrong User Email or password");
    }
    return (
        <div className="modal__login">
            <div className="modal__overlay" onClick={() => setOpenModalLogin(false)}></div>
            <div className="modal__alert">
                <div className="modal__title">
                    <h3 className="modal__title-text" >đăng nhập</h3>
                </div>
                <span className="ti-close modal__title-close" onClick={() => setOpenModalLogin(false)}></span>

                <div className="input-group input-group-lg" style={{ marginTop: "40px", height: "40px" }}>
                    <span className="input-group-text" id="inputGroup-sizing-lg">Tên tài khoản:</span>
                    <input
                        type="text"
                        name='user_email'
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        onChange={(e) => onTextFieldChange(e)} />
                </div>
                <div className="input-group input-group-lg" style={{ margin: "20px 0", height: "40px" }}>
                    <span className="input-group-text input-witdh" id="inputGroup-sizing-lg" style={{ minWidth: '98px' }}>Mật khẩu:</span>
                    <input
                        type="password"
                        name='user_password'
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        onChange={(e) => onTextFieldChange(e)} />
                </div>

                <div className="modal__alert-login">
                    <div className="modal__alert-login-button">
                        <button className="modal__alert-login-link" onClick={handleLogin}>Đăng nhập</button>
                    </div>
                    <a className="modal__alert-login-question" onClick={()=>{setOpenModalRegister(true)}}>Bạn chưa có tài khoản?</a>
                </div>
            </div>
        </div>
    )
}

export default ModalLogin