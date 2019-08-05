import React, { Component } from 'react';
import { render } from 'react-dom';
import DetailView from './detailView.jsx';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { END_POINTS } from '../../common/constant';
import { searchResults, questions } from '../../data-source/mockData';
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
                <div className="row pr-2">
                    <div className="col-md-12">
                        <div className="question">{this.props.question}</div>
                    </div>
                </div>
                <div className="row pr-2">
                    <div className="col-md-12 pb-2">
                        <div className="answers-container">
                            {this.props.answers.map((answer) => {
                                return (<div className={true ? "answer" : "answer active-ans"}
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


class ImageThumbnail extends Component {

    render() {
        const { resultItem } = this.props;
        const { images = [], tags = [] } = resultItem;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="image-animation-conatiner ">
                            {images.hero && <img src={images.hero} className="main-image" />}
                            {images.thumbnail1 && <div className="image1" style={{ backgroundImage: `url(${images.thumbnail1})`,backgroundPosition:'center' }}></div> }
                            {images.thumbnail2 && <div className="image2" style={{ backgroundImage: `url(${images.thumbnail2})`,backgroundPosition:'center' }}></div> }
                            {images.thumbnail3 && <div className="image3" style={{ backgroundImage: `url(${images.thumbnail3})`,backgroundPosition:'center' }}></div> }
                            {images.thumbnail4 && <div className="image4" style={{ backgroundImage: `url(${images.thumbnail4})`,backgroundPosition:'center' }}></div> }
                            <div className="text-container">
                                {tags && tags.map((tag) => {
                                    return <span className="key-words" key={tag.rank}>{tag.name}</span>
                                })}
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
                "query": this.getSearchQuery(),
                "questions": []
            }
        }
        this.getSearchResults = this.getSearchResults.bind(this);
        this.onQuestionSelect = this.onQuestionSelect.bind(this);
    }

    getSearchQuery() {
        let searchQuery = window.location.search;
        if (typeof searchQuery === 'string') {
            return searchQuery.replace('?q=', '').split('+').join(' ');
        }
        return ''
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
        let nextIndex = activeQuestionIndex + 1;
        if (questionList.length > nextIndex) {
            this.setState({
                activeQuestionIndex: nextIndex,
                searchRequestPayLoad: searchRequestPayLoad
            })
        }
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
        const { questionList, activeQuestionIndex, shortlistText, resultList, searchRequestPayLoad = [] } = this.state;
        return (<div class="search-results-container">
            {questionList && questionList.length > 0 &&
                <QuestionAnswer selectedAns={searchRequestPayLoad.questions || []} question={questionList[activeQuestionIndex].question} answers={questionList[activeQuestionIndex].responses} onSelect={this.onQuestionSelect} />}
            <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                    <span className="result-info">"{shortlistText}" results short listed</span>
                </div>
            </div>
            <div className="row">
                {resultList.map((resultItem, index) => {
                    return (<div className="col-sm-12 col-md-4">
                        <div className="results-list">
                            <h3><Link to={`/search/details/${searchRequestPayLoad.query}`}> #{index + 1} {resultItem.title}</Link></h3>
                            {resultItem.sources && resultItem.sources.length > 0
                                && <span>from <spam className="bt">{resultItem.sources[0]}</spam>  and {resultItem.sources.length} other</span>}
                            <ImageThumbnail resultItem={resultItem} />
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
                <Route exact path="/search/details/:searchQuery" component={QuizWithRouter} />
            </div>)} />
    </div>
</Router>, document.getElementById('containerWiz'));