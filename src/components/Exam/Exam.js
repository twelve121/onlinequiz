import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Menu from '../Menu'
import { useParams, useNavigate, Redirect } from "react-router-dom";
import axios from 'axios';
import Timer from './Timer';

function Exam() {
    let params = useParams();

    const [examData, setExamData] = useState([])
    const [questionsData, setQuestionData] = useState([])
    const [inputAnswer, setInputAnswer] = useState({})
    const [userData, setUserData] = useState([])
    const [resultData, setResultData] = useState([])
    const [topicsData, setTopicsData] = useState([])
    const [time] = useState(Date.now() + 6*10*10000)

    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3333/topics').then(
            (value) => {
                setTopicsData(value.data)
            }
        )
    }, [])

    const topic = topicsData.filter(t => t.exam_id === params.examId)

    useEffect(() => {
        axios.get('http://localhost:3333/user').then(
            (value) => {
                setUserData(value.data)
            }
        )
    }, [])

    const userId = userData.filter(item => item.user_email === sessionStorage.getItem("user")).map(item => item.id)

    useEffect(() => {
        axios.get('http://localhost:3333/questions').then(
            (value) => {
                setQuestionData(value.data)
            }
        )
    }, [])

    const Question = questionsData.filter(item => item.exam_id === params.examId)

    useEffect(() => {
        axios.get('http://localhost:3333/result').then(
            (value) => {
                setResultData(value.data)
            }
        )
    }, [])

    const resultId = resultData.map(r => r.id)
    const maxResultId = Math.max(...resultId) + 1

    const handleChange = (e) => {
        setInputAnswer({
            ...inputAnswer,
            [e.target.name]: e.target.value
        });
    }

    const storeAnswer = Object.keys(inputAnswer)
    const chosen = Object.values(inputAnswer)
    console.log('chosen:', chosen)
    const checkAnswer = questionsData.filter(check => storeAnswer.includes(check.question_id))
    console.log(checkAnswer)

    var score = 0
    const rightAnswer = checkAnswer.map(right => right.answer.ans)
    // console.log('Right answer:', rightAnswer)

    chosen.forEach((item, index) => {
        rightAnswer.forEach((item2, index2) => {
            if (index === index2 && item === item2) score += 0.5
        })
    })
    console.log(score)

    const handleCountDownSubmit = async () => {
        const id = params.examId;
        await axios.post("http://localhost:3333/result", {
            'exam_id': id,
            'user_id': userId[0] || null,
            'listAns': inputAnswer,
            'score': score
        })
            // return navigate("/");
            .then(() => { return navigate(`/result/${maxResultId}`) })
    }

    const handleSubmit = async () => {
        const id = params.examId;
        if (chosen.length < Question.length) {
            if (window.confirm('Bài thi chưa được hoàn thành, bạn có muốn nộp không?')) {
                await axios.post("http://localhost:3333/result", {
                    'exam_id': id,
                    'user_id': userId[0] || null,
                    'listAns': inputAnswer,
                    'score': score
                })
                    .then(() => { return navigate(`/result/${maxResultId}`) })
            } else {
                console.log('Thing was not saved to the database.');
            }
        }

    }
    var questionNumber = 1
    return (
        <div>
            <Header />
            <div className="border-bottom mt-50">
                <div className="grid">
                    <div className="grid__row">
                        <Menu />
                        <div className="grid__col-6">
                            <div className="testing">
                                <div className="grid__row">
                                    {topic.map(tp =>
                                        <div className="testing__header">
                                            <h2 className="testing__header-title">{tp.title}</h2>
                                        </div>
                                    )}
                                    <div className="grid__col-6-2">
                                        {Question.map(q =>
                                            <div className="testing__question-wrapper">
                                                <div className="testing__question">
                                                    <a name={q.question_id}></a>
                                                    <h3 className="testing__question-num-header" >Câu hỏi {q.question_id}</h3>
                                                    <div className="testing__question-properties">
                                                        <div className="testing__question-mark">Đạt điểm 0.5</div>
                                                        <div className="testing__question-flag">
                                                            <i className="testing__question-icon ti-close"></i>
                                                            Đặt cờ
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="testing__question-content ">
                                                    <h3 className="testing__question-title" key={q}>{q.question}</h3>
                                                    <form className="testing__question-answer">
                                                        {Object.entries(q.answer).map(a =>
                                                            <>
                                                                {/* {console.log(a)} */}
                                                                {a[0] !== 'ans' ?
                                                                    <div className="testing__question-answer-choosen">
                                                                        <input
                                                                            type="radio"
                                                                            value={a[0]}
                                                                            name={q.question_id}
                                                                            id={q.question_id + a[0]}
                                                                            required
                                                                            onChange={handleChange}
                                                                            className="testing__question-answer-input"
                                                                        />
                                                                        <label
                                                                            for={q.question_id + a[0]}
                                                                            className="testing__question-answer-label"
                                                                        >{a[1]}
                                                                        </label>
                                                                    </div>
                                                                    : ''}
                                                            </>
                                                        )}
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid__col-2-2">
                                        <div className="testing__question-extra">
                                            <div className="grid__row">
                                                <h3 className="testing__question-extra-header">Các câu hỏi trong bài kiểm tra</h3>
                                                <div className="count-down">
                                                    <div className="count-down-wrapper">
                                                        <div className="count-down__icon">
                                                            <i className="ti-alarm-clock"></i>
                                                        </div>
                                                        {/* <Countdown
                                                            className="quiz-time-left"
                                                            date={Date.now() + 6 * 20 * 10000}
                                                            onComplete={handleSubmit}
                                                        /> */}
                                                        <Timer handleCountDownSubmit={handleCountDownSubmit} time={time} />
                                                    </div>
                                                </div>
                                                {Question.map(q =>
                                                    <div className="testing__question-id">
                                                        <div className="testing__question-id-num">
                                                            <a href={'#' + q.question_id} style={{ textDecoration: 'none' }}>{q.question_id}</a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="submit"
                                                value="Kết thúc bài kiểm tra"
                                                className="testing__question-extra-submit"
                                                onClick={handleSubmit} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Exam