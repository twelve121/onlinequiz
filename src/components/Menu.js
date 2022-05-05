import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Menu() {
    const [topicData, setTopicData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3333/topics').then(
            (value) => {
                setTopicData(value.data)
            }
        )
    }, [])
    // console.log(topicData)
    return (
        <div className="grid__col-2">
            {/* <!-- MENU --> */}
            <nav className="menu">
                <ul className="menu-category">
                    <li className="menu-list">
                        <Link
                            className="menu-list__link"
                            to={`/`}
                        >
                            <i className="menu-icon ti-home"></i>
                            Trang chủ
                        </Link>
                    </li>
                    <li className="menu-list">
                        {/* <a href="contact.html" className="menu-list__link">
                            Liên hệ
                        </a> */}
                        <Link
                            className="menu-list__link"
                            to={`/contact`}
                        >
                            <i className="menu-icon ti-location-pin"></i>
                            Liên hệ
                        </Link>
                    </li>
                </ul>
                <ul className="menu__course">
                    <li className="menu__course-list">
                        <a href="#" style={{ cursor: "default" }} className="menu__course-list__link">
                            <i className="menu-icon ti-list"></i>
                            Các khóa học
                        </a>

                        <ul className="menu__course-2">
                            {topicData.map(item => {
                                return (
                                    <li className="menu__course-list-2">
                                        <Link
                                            className={`menu__course-list__link-2 ${(!sessionStorage.getItem("user") && (item.free === "0")) ? "opacity" : ""}`}
                                            to={`/exams/${item.exam_id}`}
                                            key={item.exam_id}
                                        >
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu