import React, { Component } from 'react';
import { render } from 'react-dom';
import DetailView from './detailView.jsx';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { END_POINTS } from '../../common/constant';
import { searchResults, questions } from '../../data-source/mockData';
class QuestionAnswer extends Component {
    render() {
        return (
            <div className={`question-answers-container ${this.props.className}`}>
                <div className="row pr-2">
                    <div className="col-md-12">
                        <div className="question">{this.props.question}</div>
                    </div>
                </div>
                <div className="row pr-2">
                    <div className="col-md-12 pb-2">
                        <div className="answers-container">
                            {this.props.answers.map((answer) => {
                                return (<div className={this.props.selectedAns ? "answer" : "answer active-ans"} onClick={() => this.props.onSelect(answer)}>
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


class ImageThumbnail extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="image-animation-conatiner ">
                            <img src='../img/download.jpeg' className="main-image" />
                            <img src='../img/sample_img.jpeg' className="image1" />
                            <img src='../img/sample_img.jpeg' className="image2" />
                            <img src='../img/sample_img.jpeg' className="image3" />
                            <img src='../img/sample_img.jpeg' className="image4" />
                            <div className="text-container">
                                <span className="key-words">Beautiful view</span><i class="fa fa-question-circle-o" aria-hidden="true"></i>
                                <span className="key-words">water sports</span>
                                <span className="key-words">Beach fast Food Center</span>
                                <span className="key-words">cosy place</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export class ResultsList extends React.Component {

    constructor() {
        super();
        this.state = {
            resultList: [],
            searchKey: '',
            questionList: [],
            shortlistText: 0,
            activeQuestionIndex: 0,
            searchRequestPayLoad: {
                "query": "",
                "questions": []
            }
        }
        this.getSearchResults = this.getSearchResults.bind(this);
        this.onQuestionSelect = this.onQuestionSelect.bind(this);
    }

    componentDidMount() {
        document.querySelector('.loading').style.display = 'none';
        this.setState({
            resultList: searchResults.results,
            questionList: questions.results,
            shortlistText: searchResults.shortlistText
        })
    }

    onQuestionSelect(answer) {
        let { activeQuestionIndex, questionList, searchRequestPayLoad } = this.state;
        searchRequestPayLoad.questions.push({
            id: questionList[activeQuestionIndex].id,
            responseId: answer.id
        })
        this.setState({
            activeQuestionIndex: questionList.length > activeQuestionIndex++  ? activeQuestionIndex++ : activeQuestionIndex,
            searchRequestPayLoad: searchRequestPayLoad
        })
    }

    getSearchResults() {
        fetch(END_POINTS.SEARCH, {
            method: "POST",
            body: data
        })
            .then(function (res) { return res.json(); })
            .then(function (data) { alert(JSON.stringify(data)) })
    }

    getQuestionList() {
        fetch(END_POINTS.GET_QUESTIONS, {
            method: "GET"
        })
            .then(function (res) { return res.json(); })
            .then(function (data) { alert(JSON.stringify(data)) })
    }

    render() {
        const { questionList, activeQuestionIndex, shortlistText, resultList } = this.state;
        return (<div class="search-results-container">
            {questionList && questionList.length > 0 &&
                <QuestionAnswer question={questionList[activeQuestionIndex].question} answers={questionList[activeQuestionIndex].responses} onSelect={this.onQuestionSelect} />}
            <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                    <span className="result-info">"{shortlistText}" results short listed</span>
                </div>
            </div>
            <div className="row">
                {resultList.map((resultItem, index) => {
                    return (<div className="col-sm-12 col-md-4">
                        <div className="results-list">
                            <h3><Link to="/search/details"> #{index + 1} {resultItem.title}</Link></h3>
                            {resultItem.sources && resultItem.sources.length > 0
                                && <span>from <spam className="bt">{resultItem.sources[0]}</spam>  and {resultItem.sources.length} other</span>}
                            <ImageThumbnail />
                        </div>
                    </div>)
                })}
            </div>
        </div>
        )
    }

}

var QuizWithRouter = withRouter(DetailView)

render(<Router>
    <div>
        <Route path="/search" render={() => (
            <div className="results">
                <Route exact path="/search" component={ResultsList} />
                <Route exact path="/search/details" component={QuizWithRouter} />
            </div>)} />
    </div>
</Router>, document.getElementById('containerWiz'));