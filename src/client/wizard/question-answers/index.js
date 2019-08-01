import React from 'react';

export const QuestionAnswer = (props) => {
    const { question, answers, onSelect, selectedAns } = props;
    return (
        <div className={`question-answers-container ${props.className}`}>
            <div className="row pr-2">
                <div className="col-md-12">
                    <span className="question">{question}</span>
                </div>
            </div>
            <div className="row pr-2">
                <div className="col-md-12 pb-2">
                    <div className="answers-container">
                        {answers.map((answer) => {
                            return (<div className={selectedAns ? "answer" : "answer active-ans"} onClick={() => onSelect(answer)}>
                                <span className="ans-text" >{answer}</span>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}