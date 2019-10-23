import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { detailView } from '../../data-source/mockData';
import { questions } from '../../data-source/mockDataQnA';
import ModalView from './modalView.jsx';

class QuestionAnswer extends Component {

    isSelected(selectedAns, answer) {
        if (selectedAns && selectedAns.length === 0) {
            return false;
        }
        const found = (selectedAns || []).find((selectedAnswer) => selectedAnswer.responseId === answer.id);

        return found ? true : false;
    }

    render() {

        return (
            <div className={`question-answers-container ${this.props.className}`}>
                <ul className="wstep">
                    <li className={this.props.activeIndex >= 1 ? "wstep1 active" : "wstep1"}></li>
                    <li className={this.props.activeIndex >= 2 ? "wstep2 active" : "wstep2"}></li>
                    <li className={this.props.activeIndex >= 3 ? "wstep3 active" : "wstep3"}></li>
                    <li className={this.props.activeIndex >= 4 ? "wstep4 active" : "wstep4"}></li>
                </ul>
                <div className="row pr-2">
                    <div className="col-md-12 ">
                        <div className="question">{this.props.question}</div>
                    </div>
                </div>
                <div className="row pr-2">
                    <div className="col-md-12 pb-2" >
                        <div className="answers-container">
                            {this.props.answers.map((answer) => {
                                return (<div key={Math.random()} className={true ? "answer" : "answer active-ans"}
                                    onClick={() => this.props.onSelect(answer)}>
                                    <span className="ans-text" >{answer.title}</span>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

class Book extends Component {

    constructor() {
        super();
        this.state = {
            activeQuestionIndex: 0,
            showLoader: false,
            questionList: questions.results,
            searchRequestPayLoad: {
                "query": this.getSearchQuery(),
                "questions": []
            },
            displayQuestions: true
        }
        this.onQuestionSelect = this.onQuestionSelect.bind(this);
    }
    componentWillUnmount() {
    }
    componentDidMount() {
        const { params } = this.props.match;
        setTimeout(function(){document.getElementById('logoHeading').style.opacity = '1';},0);
        this.setState({
            searchQuery: params.searchQuery,
            details: detailView,
            selectedSentiment: detailView.sentiments && Object.keys(detailView.sentiments)[0] || {}
        })
        setTimeout(function(){this.setState({showLoader: false})}.bind(this),400);
    }
    getSearchQuery() {
        let searchQuery = window.location.search;
        if (typeof searchQuery === 'string') {
            return searchQuery.replace('?q=', '').split('+').join(' ');
        }
        return ''
    }
    onQuestionSelect(answer) {
        let { activeQuestionIndex, questionList, searchRequestPayLoad } = this.state;
        searchRequestPayLoad.questions.push({
            id: questionList[activeQuestionIndex].id,
            responseId: answer.id
        })
        let nextIndex = activeQuestionIndex + 1;
        if (questionList.length > nextIndex) {
            this.setState({
                activeQuestionIndex: nextIndex,
                searchRequestPayLoad: searchRequestPayLoad
            })
        }
        if(activeQuestionIndex == 3) {
            window.location.href = "/recommended-picks";
        }
    }

    render() {
         const { questionList, activeQuestionIndex, searchRequestPayLoad = [], displayQuestions, showLoader } = this.state;
        return (<div>
                    <div className="logo" id="logoWrapper">
                        <img id="logo" className="logo-img" style={{width: '40px'}} src="../img/images/logo_ic.png" />
                        <div id="logoHeading" className="logo-heading">Plan your home</div>
                    </div>
                    <div><i className="loading" style={{display: showLoader ? 'block' : 'none'}}></i></div>
                    <div className="main fadeInBottom">

                        {questionList && questionList.length > 0 &&
                         <QuestionAnswer selectedAns={searchRequestPayLoad.questions || []} question={questionList[activeQuestionIndex].question} answers={questionList[activeQuestionIndex].responses} onSelect={this.onQuestionSelect} activeIndex={activeQuestionIndex+1} />}


                    </div>
                <div className="desc copyright" style={{textAlign: 'center',fontSize: '14px'}}>Copyright © 2019 Stint.do</div><br/>
                </div>)
    }
}

export default withRouter(Book);