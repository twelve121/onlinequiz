import React, { useState, useEffect } from 'react'
import ModalLogin from './Modal/ModalLogin'
import axios from "axios";
import { Navigate, useNavigate  } from 'react-router-dom';
import ModalRegister from './Modal/ModalRegister'

function Header() {
    const [openModalLogin, setOpenModalLogin] = useState(false)
    const [openModalRegister, setOpenModalRegister] = useState(false)
    const [userData, setUserData] = useState([])
    let navigate = useNavigate();

    // let userData = await axios.get("http://localhost:3333/user");
    useEffect(() => {
        axios.get('http://localhost:3333/user').then(
            (value) => {
                setUserData(value.data)
            }
        )
    }, [])

    const userName = userData.filter(item => item.user_email === sessionStorage.getItem("user")).map(item => item.user_name)

    function logout(){
        sessionStorage.clear();
        navigate(`/`)
        window.location.reload(false)
    }
    return (
        <header className="top-bar">
            <div className="top-bar__grid">
                <div className="top-bar__search">
                    <div className="top-bar__search-input">
                        <form action="" method="post">
                            <input type="text" className="search-input" placeholder="Tìm kiếm khóa học" name="search" />
                        </form>
                        <button className="top-bar__search-btn">
                            <i className="top-bar__search-icon ti-search"></i>
                        </button>
                    </div>
                </div> 
                <marquee style={{display: !sessionStorage.getItem("user")?'flex':'none'}} className="top-bar__marquee" >Bạn cần đăng nhập để thực hiện các khóa học tiếp theo</marquee>
                <ul className="top-bar__user-login">

                    {/* <!-- NOT LOGGED --> */}
                    {(sessionStorage.getItem("user") === null) ?
                        (<>
                            <li className="top-bar__login">
                                <a className="top-bar__login-link" onClick={() => setOpenModalRegister(true)}>
                                    Đăng ký
                                </a>
                            </li>
                            <li className="top-bar__login">
                                <a className="top-bar__login-link" onClick={() => setOpenModalLogin(true)}>
                                    Đăng nhập
                                </a>
                            </li>
                        </>) :
                        (<>
                            {/* <!-- LOGGED --> */}
                            <li className="top-bar__user">
                                <i className="ti-angle-down top-bar__user-icon"></i>
                                {/* <!-- <img src="..\images\f3.png" alt="" className="top-bar__user-img"> --> */}
                                <span className="top-bar__user-name">{userName}</span>
                                <ul className="top-bar__user-logout">
                                    <li className="top-bar__user-logout-list">
                                        <a href="profile.html" className="top-bar__user-logout-link">
                                            <i className="ti-user top-bar__user-list-icon"></i>
                                            Trang cá nhân
                                        </a>
                                    </li>
                                    <li className="top-bar__user-logout-list">
                                        <a className="top-bar__user-logout-link" onClick={logout}>
                                            <i className="ti-share top-bar__user-list-icon"></i>
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </>)}
                </ul>
                {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} setOpenModalRegister={setOpenModalRegister}/>}
                {openModalRegister && <ModalRegister setOpenModalRegister={setOpenModalRegister} setOpenModalLogin={setOpenModalLogin} />}
            </div>

        </header>
    )
}

export default Header