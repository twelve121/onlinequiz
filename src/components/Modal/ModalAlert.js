import React from 'react'

function ModalAlert(props) {
    const { setAlert } = props
    return (
        <div className="modal__login">
            <div className="modal__overlay" onClick={() => setAlert(false)}></div>
            <div className="modal__alert">
                <div className="modal__alert-des" style={{marginTop: "20px"}}>
                    <i className="fas fa-sad-tear modal__alert-icon"></i>
                    <h3 className="modal__alert-text" >Bạn cần đăng nhập để thực hiện các khóa học tiếp theo</h3>
                </div>
                <div className="modal__alert-close-icon ">
                    <span className="ti-close" onClick={() => setAlert(false) }></span>
                </div>
                <div className="modal__alert-login">
                    <div className="modal__alert-login-button">
                        <a href="" className="modal__alert-login-link">Đăng nhập</a>
                    </div>
                    <a href="" className="modal__alert-login-question">Bạn chưa có tài khoản?</a>
                </div>
            </div>
        </div>
    )
}

export default ModalAlert