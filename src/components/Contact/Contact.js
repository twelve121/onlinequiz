import axios from 'axios';
import React, { useState } from 'react'
import Header from '../Header'
import Menu from '../Menu'

function Contact() {
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        feedback: ""
    });

    function onTextFieldChange(e) {
        setContactData({
            ...contactData,
            [e.target.name]: e.target.value
        });
        console.log(contactData)
    }

    async function submitContact() {
        await axios.post("http://localhost:3333/contact", contactData);
        alert("Phản hồi của bạn đã được gửi thành công!");
    }
    return (
        <div>
            <Header />
            <div className="border-bottom mt-50">
                <div className="grid">
                    <div className="grid__row">
                        <Menu />
                        <div className="grid__col-6">
                            <div className="register-login-contact">
                                <div className="register-login-contact__heading">
                                    <h2 className="register-login-contact__heading-title">Liên hệ</h2>
                                </div>

                                <div className="register-login-contact__info">
                                    <div className="map">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14895.522067484795!2d105.7833679!3d21.0374663!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9ae247114fb38da3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1636270417931!5m2!1svi!2s" width="100%" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy"></iframe>
                                    </div>
                                    <form className="register-login-contact__form">
                                        <label className="register-login-contact__label" for="">Họ và tên: </label>
                                        <input className="register-login-contact__input" onChange={(e) => onTextFieldChange(e)}  name="name" type="text" />

                                        <label className="register-login-contact__label" for="">Email: </label>
                                        <input className="register-login-contact__input" onChange={(e) => onTextFieldChange(e)}  name="email" type="email" />

                                        <textarea className="register-login-contact__input" onChange={(e) => onTextFieldChange(e)}  placeholder="Đóng góp ý kiến của bạn tại đây!" name="feedback" rows="10" cols="30" type="text" style={{ height: '150px', width: '100%' }}></textarea>
                                        <div className="register-login-contact__form-submit">
                                            <button className="register-login-contact__btn" onClick={submitContact}>Gửi ý kiến</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact