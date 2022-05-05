import React from 'react'
import Countdown from 'react-countdown'

function Timer(props) {
    const {handleCountDownSubmit, time} = props
    return (
        <div>
            <Countdown
                className="quiz-time-left"
                date={time}
                onComplete={handleCountDownSubmit}
            />
        </div>

    )
}

export default React.memo(Timer)