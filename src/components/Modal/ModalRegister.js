import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function ModalRegister(props) {
    const {setOpenModalRegister, setOpenModalLogin} = props
    const [userData, setUserData] = useState({
        user_name: "",
        user_email: "",
        user_password: ""
    });

    function onTextFieldChange(e) {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const [password, setPassword] = useState("");

    function handlePassword(e) {
        setPassword({ "confirmPassword": e.target.value });
    }

    async function handleSignup() {
        if (userData.user_password === password.confirmPassword) {
            await axios.post("http://localhost:3333/user", userData);
            alert("Your account has created");
            alert("Please Login");
            setOpenModalRegister(false)
            setOpenModalLogin(true);
        }
        else alert("password did not match");
    }
    return (
        <div className="modal__login">
            <div className="modal__overlay" onClick={() => setOpenModalRegister(false)}></div>
            <div className="modal__alert">
                <div className="modal__title">
                    <h3 className="modal__title-text" >đăng ký</h3>
                </div>
                <span className="ti-close modal__title-close" onClick={() => setOpenModalRegister(false)}></span>

                <div className="input-group input-group-lg" style={{ marginTop: "40px", height: "40px" }}>
                    <span className="input-group-text" id="inputGroup-sizing-lg" style={{ minWidth: '125.59px' }}>Họ và tên:</span>
                    <input
                        type="text"
                        name='user_name'
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        onChange={(e) => onTextFieldChange(e)} />
                </div>
                <div className="input-group input-group-lg" style={{ margin: "20px 0", height: "40px" }}>
                    <span className="input-group-text input-witdh" id="inputGroup-sizing-lg" style={{ minWidth: '125.59px' }}>Email:</span>
                    <input
                        type="text"
                        name='user_email'
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        onChange={(e) => onTextFieldChange(e)} />
                </div>

                <div className="input-group input-group-lg" style={{ margin: "20px 0", height: "40px" }}>
                    <span className="input-group-text input-witdh" id="inputGroup-sizing-lg" style={{ minWidth: '125.59px' }}>Mật khẩu:</span>
                    <input
                        type="password"
                        name='user_password'
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        onChange={(e) => onTextFieldChange(e)} />
                </div>

                <div className="input-group input-group-lg" style={{ margin: "20px 0", height: "40px" }}>
                    <span className="input-group-text input-witdh" id="inputGroup-sizing-lg" style={{ minWidth: '125.59px' }}>Nhập lại mật khẩu:</span>
                    <input
                        type="password"
                        name='confirmPassword'
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        onChange={(e) => handlePassword(e)} />
                </div>
                <div className="modal__alert-login">
                    <div className="modal__alert-login-button">
                        <button className="modal__alert-login-link" onClick={handleSignup}>Đăng ký</button>
                    </div>
                    <a className="modal__alert-login-question" onClick={()=>{setOpenModalRegister(false);setOpenModalLogin(true)}}>Bạn chưa đã tài khoản?</a>
                </div>
            </div>
        </div>
    )
}

export default ModalRegister