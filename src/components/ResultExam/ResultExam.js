import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Menu from '../Menu';

function ResultExam() {
    let params = useParams();
    const [resultData, setResultData] = useState([])
    const [questionData, setQuestionData] = useState([])
    const [listQuest, setListQuest] = useState([])
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3333/result').then(
            (value) => {
                setResultData(value.data)
            }
        )
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3333/questions').then(
            (value) => {
                setQuestionData(value.data)
            }
        )
    }, [])

    const checkResult = resultData.filter(rd => rd.id === parseInt(params.resultId))
    console.log(checkResult)

    const listAnswer = checkResult.map(cr => cr.listAns)
    let ansKeys = [], ansValues = [];
    listAnswer.forEach((element, index) => {
        ansKeys = Object.keys(listAnswer[index])
        ansValues = Object.values(listAnswer[index])
    });
    console.log(ansValues)
    const Question = questionData.filter(item => item.exam_id === checkResult[0].exam_id)
    console.log(Question)

    // useEffect(() => {
    Question.forEach((value, index) => {
        ansValues.forEach((ans, index2) => {
            if (index === index2) {
                const pushData = {
                    question_id: value.question_id,
                    question: value.question,
                    answer: value.answer,
                    chosen: ans,
                    questionScore: (value.answer.ans === ans)?'0.5':'0'
                }
                listQuest.push(pushData)
            }
            
        })
    })
    // })
    const listResult = listQuest.filter((element, index) => index === listQuest.findIndex(elem => elem.question_id === element.question_id && elem.chosen === element.chosen))
    console.log(listResult)
    var questionNumber = 1
    var numberQ = 1
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
                                    <div className="testing__header">
                                        <h2 className="testing__header-title">Kết quả</h2>
                                    </div>
                                    <div className="grid__col-6-2">
                                        {listResult.map(q =>
                                            <div className="testing__question-wrapper">
                                                <div className="testing__question">
                                                    <a name={q.question_id}></a>
                                                    <h3 className="testing__question-num-header" >Câu hỏi {questionNumber++}</h3>
                                                    <div className="testing__question-properties">
                                                        <div className={q.questionScore==='0'?"testing__question-mark-wrong":"testing__question-mark"}>Đạt điểm: {q.questionScore}</div>
                                                        <div className="testing__question-flag">
                                                            <i className="testing__question-icon ti-close"></i>
                                                            Đặt cờ
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="testing__question-content ">
                                                    <h3 className="testing__question-title" key={q}>{q.question}</h3>
                                                    <form className="testing__question-answer">
                                                        {Object.entries(q.answer).map((a, index) =>
                                                            <>
                                                                {a[0] !== 'ans' ?
                                                                    <div className="testing__question-answer-choosen">
                                                                        {/* {console.log('a:',a[0]==='op1')} */}
                                                                        <input
                                                                            type="radio"
                                                                            value={a[0]}
                                                                            name={q.question_id}
                                                                            id={q.question_id + a[0]}
                                                                            required
                                                                            checked={a[0] === q.chosen ? true : false}
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
                                                <div className="testing__question" style={{ backgroundDolor: '#dbdbdb', marginTop: '10px' }}>
                                                    <div >
                                                        <label className="testing__question-answer-label">Đáp án đúng: {q.answer.ans}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid__col-2-2">
                                        <div className="testing__question-extra">
                                            <div className="grid__row">
                                                <h3 className="testing__question-extra-header">Các câu hỏi trong bài kiểm tra</h3>
                                                {checkResult.map(s =>
                                                    <div className="count-down">
                                                        <p style={{ fontSize: '1.6rem', height: '40px', lineHeight: '40px', marginBottom: '0' }}>Tổng điểm là: {s.score} điểm</p>
                                                    </div>
                                                )}
                                                {Question.map(q =>
                                                    <div className="testing__question-id">
                                                        <div className="testing__question-id-num">
                                                            <a href={'#' + q.question_id} style={{ textDecoration: 'none' }}>{numberQ++}</a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
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

export default ResultExam