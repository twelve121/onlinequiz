import React, { useEffect, useState } from 'react'
import Menu from '../Menu'
import axios from "axios";
import ModalAlert from '../Modal/ModalAlert'
import { Link } from 'react-router-dom';

function Body() {

    const [alert, setAlert] = useState(false)
    const [topicData, setTopicData] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:3333/topics').then(
            (value) => {
                setTopicData(value.data)
            }
        )
    }, [])

    // console.log(!sessionStorage.getItem("user"));
    // console.log(topicData)
    return (
        <div className="border-bottom mt-50">
            <div className="grid">
                <div className="grid__row">
                    <Menu />
                    <div className="grid__col-6">
                        <div className="home-course mb-20">
                            <div className="grid__row">
                                <div className="home-course__heading">
                                    <h2 className="home-course__heading-title">Các khóa học</h2>
                                </div>
                                {/* <!-- LOGGED --> */}
                                {topicData.map(item => {
                                    // console.log((sessionStorage.getItem("user" === null) && (item[0].free === "1")) ? "opacity" : "");
                                    return (
                                        <div className="grid__col-2-3">
                                            <div className={`home-course__subject ${(!sessionStorage.getItem("user") && (item.free === "0")) ? "opacity" : ""}`}>
                                                {/* <a href="testing.html" className={`home-course__subject-img-link ${(!sessionStorage.getItem("user") && (item.free === "0")) ? "opacity" : ""}`}>
                                                    <div className="home-course__subject-img"
                                                        style={{ backgroundImage: `url(${item.thumbnail})` }}>
                                                    </div>
                                                </a> */}
                                                <Link
                                                    className={`home-course__subject-img-link ${(!sessionStorage.getItem("user") && (item.free === "0")) ? "opacity" : ""}`}
                                                    to={`/exams/${item.exam_id}`}
                                                    key={item.exam_id}
                                                >
                                                    <div className="home-course__subject-img"
                                                        style={{ backgroundImage: `url(${item.thumbnail})` }}>
                                                    </div>
                                                </Link>
                                                <div className="home-course__subject-wrapper">
                                                    <div className="home-course__subject-title">
                                                        <h3 className="home-course__subject-title-name">
                                                            <Link
                                                                className={`home-course__subject-title-link ${(!sessionStorage.getItem("user") && (item.free === "0")) ? "opacity" : ""}`}
                                                                to={`/exams/${item.exam_id}`}
                                                                key={item.exam_id}
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <div className="home-course__subject-description">
                                                        <span>{item.description}</span>
                                                    </div>
                                                    {/* <a href="testing.html" className="home-course__subject-link" >
                                                        Đăng ký thi thử
                                                    </a> */}
                                                    <Link
                                                        className="home-course__subject-link"
                                                        to={`/exams/${item.exam_id}`}
                                                        key={item.exam_id}
                                                    >
                                                        Đăng ký thi thử
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {alert && <ModalAlert setAlert={setAlert} />}
        </div>
    )
}

export default Body