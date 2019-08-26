import React, { Component } from 'react';
import { render } from 'react-dom';
import DetailView from './detailView.jsx';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { END_POINTS } from '../../common/constant';
import { searchResults, questions } from '../../data-source/mockDataQnA';
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


class ImageThumbnail extends Component {
    handleScroll() {
        var observer = new IntersectionObserver(function(entries) {
                	if(entries[0].isIntersecting === true) {
                	    console.log('Element is fully visible in screen', entries[0].target.id);
                	    var elemId = entries[0].target.id
                	    elemId = 'i'+elemId.substr(elemId.indexOf(elemId)+elemId.length-1,elemId.length);
                        console.log('elemId:', elemId);
                        document.getElementById(elemId+'1').classList.add('image1');
                        document.getElementById(elemId+'2').classList.add('image2');
                        document.getElementById(elemId+'3').classList.add('image3');
                	}

                }, { threshold: [1] });

                observer.observe(document.querySelector(`#img-container-${this.props.index}`));
    }
    componentDidMount() {
        this.handleScroll = this.handleScroll.bind(this);
         window.addEventListener('scroll', this.handleScroll);
    }
    render() {
        const { resultItem, index } = this.props;
        const { images = [], tags = [] } = resultItem;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div id={`img-container-${index}`} className="image-animation-conatiner ">
                            {/* {images.hero && <img src={images.hero} className="main-image" />} */}

                            {images.hero && <div><div className="main-image" style={{ backgroundImage: `url(${images.hero})`,backgroundSize:'cover' }}></div>
                             <div className="main-image bg"></div></div>
                             }
                            {images.thumbnail1 && <div id={`i${index}1`} style={{ backgroundImage: `url(${images.thumbnail1})`,backgroundSize:'cover' }}></div> }
                            {images.thumbnail2 && <div id={`i${index}2`} style={{ backgroundImage: `url(${images.thumbnail2})`,backgroundSize:'cover' }}></div> }
                            {images.thumbnail3 && <div id={`i${index}3`} style={{ backgroundImage: `url(${images.thumbnail3})`,backgroundSize:'cover' }}></div> }
                            {images.thumbnail4 && <div id={`i${index}4`} style={{ backgroundImage: `url(${images.thumbnail4})`,backgroundSize:'cover' }}></div> }
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
            shortlistCount: 0,
            activeQuestionIndex: 0,
            searchRequestPayLoad: {
                "query": this.getSearchQuery(),
                "questions": []
            }
        }
        this.getSearchResults = this.getSearchResults.bind(this);
        this.onQuestionSelect = this.onQuestionSelect.bind(this);
        this.openDetailModal = this.openDetailModal.bind(this);
        this.closeDetailModal = this.closeDetailModal.bind(this);
    }

    getSearchQuery() {
        let searchQuery = window.location.search;
        if (typeof searchQuery === 'string') {
            return searchQuery.replace('?q=', '').split('+').join(' ');
        }
        return ''
    }

    handleScroll() {
            if(typeof window.clickedResultElemId != 'undefined') {
                //console.log('diff: ', document.querySelector('#'+clickedResultElemId).getClientRects()[0].y);
                //console.log('pageYOffset: ', window.pageYOffset);

                /*var resultNum = window.clickedResultIndex;
                var offsetTopVal = (window.clickedResultIndex + 1) * 270;
                var diff = document.querySelector('#'+clickedResultElemId).getClientRects()[0].y;

                var compare = pageYOffset+650;
                console.log('compare: '+compare+', offsetTopVal: '+offsetTopVal);
                if(offsetTopVal - compare <= 100 && offsetTopVal - compare >= -400) {
                    console.log('show sticky');
                } else {
                    console.log('hide sticky');
                }*/
                if(typeof clickedResultElemId != 'undefined' && document.getElementById(clickedResultElemId).getClientRects()[0].top >= 400) {
                                console.log('show sticky bar for '+clickedResultElemId);
                              }
            }
            /*var observer = new IntersectionObserver(function(entries) {
                    	if(entries[0].isIntersecting === true) {
                    	    console.log('Element is fully visible in screen', entries[0].target.id);
                    	    //var elemId = entries[0].target.id
                    	    //elemId = 'i'+elemId.substr(elemId.indexOf(elemId)+elemId.length-1,elemId.length);
                            //console.log('elemId:', elemId);
                    	}

                    }, { threshold: [1] });
                    if(typeof window.clickedResultElemId != 'undefined') {
                        observer.observe(document.querySelector('#'+window.clickedResultElemId+' h3'));
                    }*/
        }


    componentDidMount() {
        this.handleScroll = this.handleScroll.bind(this);
        //window.addEventListener('scroll', this.handleScroll);
        document.querySelector('.loading').style.display = 'none';
        this.setState({
            resultType: searchResults.resultType,
            resultList: searchResults.results,
            questionList: questions.results,
            shortlistText: searchResults.shortlistText,
            shortlistCount: searchResults.shortlistCount
        })
    }

    expandResults(index) {
       document.querySelectorAll('.results-list').forEach(function(elem){ elem.classList.remove('expanded');});
       if(location.href.indexOf('#')==-1){
            window.originalUrl = location.href;
       }
       //location.href = window.originalUrl + '#res-shade-'+index;
       setTimeout(function(){document.getElementById('res'+this.i).classList.add('expanded');}.bind({i:index}),1000);
       document.getElementById('res-shade-'+index).classList.add('hidden');
       document.querySelector('#'+'res'+index+' ul.qna li:first-child input').checked = true;


       window.clickedResultElemId = 'res'+index;
       window.clickedResultIndex = index+1;
       this.openDetailModal();
       window.scrollTo(0, 0);
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
    openDetailModal() {
      document.getElementById('visible').style.top = "0";
      document.getElementById('visible-block').style.top = "0";
      document.getElementById('modalc').innerHTML = document.getElementById(clickedResultElemId).innerHTML;
    }
    closeDetailModal() {
      document.getElementById('visible').style.top = "-100%";
      document.getElementById('visible-block').style.top = "-100%";
    }

    render() {
        const { questionList, activeQuestionIndex, shortlistCount, shortlistText, resultList, searchRequestPayLoad = [], resultType } = this.state;
        return (<div class="search-results-container">
            {questionList && questionList.length > 0 &&
                <QuestionAnswer selectedAns={searchRequestPayLoad.questions || []} question={questionList[activeQuestionIndex].question} answers={questionList[activeQuestionIndex].responses} onSelect={this.onQuestionSelect} />}
            <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                    <span className="result-info">{shortlistCount}<span style={{fontWeight: 'normal', fontSize: '14px', color: '#a9a9a9'}}>{shortlistText}</span></span>
                </div>
                <hr className="line-shade" />
            </div>
            <div className="row">
                {resultList.map((resultItem, index) => {
                    return (<div className="col-sm-12 col-md-4">
                        <div id={`res${index}`} className="results-list">
                            <h3><Link to={`/search/details/${searchRequestPayLoad.query}`}>{resultItem.title}</Link><span className="sub-title">{resultItem.subTitle}</span></h3>

                                <ul className="qna">
                                {resultType != 'travel' &&
                                    resultItem.qna.map((qnaItem, index) => {
                                        return (<li>
                                                <input id={`qna${index}${resultItem.title.replace(/ /g,'')}`} type="radio" name="list" />
                                                <label htmlFor={`qna${index}${resultItem.title.replace(/ /g,'')}`}>{qnaItem.question}</label><span className="qna-arrow"></span>
                                                <div className="qna-res">
                                                {
                                                (qnaItem.question.indexOf('What people liked') >= 0 || qnaItem.question.indexOf('What people disliked') >= 0) &&
                                                qnaItem.responses && qnaItem.responses.length > 0 && qnaItem.responses.map((qnaResponse, index) => {
                                                        return (<div>
                                                            <p>
                                                            <div><b>{qnaResponse.topic.charAt(0).toUpperCase() + qnaResponse.topic.slice(1)}</b></div>
                                                            {

                                                                qnaResponse.opinions && qnaResponse.opinions.length > 0
                                                                    && qnaResponse.opinions.map((opinion, indexOpinion) => {
                                                                    return (
                                                                        <div>
                                                                            <div className="quoted-text">
                                                                                   {opinion.text.content}
                                                                            </div>
                                                                            <br/>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            </p>
                                                        </div>)
                                                })}



                                                {
                                                (qnaItem.question.indexOf('What people disliked') >= 0) &&
                                                qnaItem.responses && qnaItem.responses.length == 0 ? <div className="qna-res"><p><div className="quoted-text">No specific dislikes for {resultItem.title}.</div></p></div> : null}



                                                {
                                                qnaItem.question.indexOf('What people said') >= 0 &&
                                                qnaItem.responses && qnaItem.responses.length > 0 && qnaItem.responses.map((qnaResponse, index) => {
                                                        return (<div className="qna-res">
                                                            <p>
                                                            <div className="quoted-text">{qnaResponse.text.content}</div>

                                                            </p>
                                                        </div>)
                                                })}
                                                <br/>

                                                </div>

                                        </li>);
                                    })
                                }
                                </ul>


                        </div>
                        <div id={`res-shade-${index}`} className="result-shade" onClick={(e)=>{this.expandResults(index);}}/>
                        <hr className="line-shade top"/>
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