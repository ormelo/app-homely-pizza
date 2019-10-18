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


class Guide extends React.Component {

    constructor() {
        super();
        this.state = {
            questionList: questions.results,
            activeQuestionIndex: 0,
            searchRequestPayLoad: {
                "query": this.getSearchQuery(),
                "questions": []
            },
            displayQuestions: true
        };
        this.onQuestionSelect = this.onQuestionSelect.bind(this);
        this.handleRecommenderClick = this.handleRecommenderClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.onRecommenderClick = this.handleRecommenderClick;
    }

    handleRecommenderClick() {
        document.querySelector('#id_submit').style.visibility = 'hidden';
        document.querySelector('.recommender-body').style.visibility = 'hidden';
        this.setState({displayQuestions: true});
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

    handleScroll() {
        if(window.scrollY == 0) {
            document.querySelector('.logo').style.borderBottom = '0px solid';
        } else {
            document.querySelector('.logo').style.borderBottom = '1px solid #eeeeee';
            if(window.scrollY >= 600) {
                document.querySelector('.recommender').style.opacity = '1';
                document.querySelector('.logo').style.display = 'none';
                document.querySelector('.recommender').style.minHeight = '220px';
            } else {
                document.querySelector('.logo').style.display = 'block';
            }
        }
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
            const { questionList, activeQuestionIndex, searchRequestPayLoad = [], displayQuestions } = this.state;
            return (<div>

                <img src="./img/images/banner-meditate.jpg" style={{marginTop: '-27px', height: '479px'}}/>
                <div className="main">
                    <div>

                        <div className="header">Make some time for life<br/><div className="sub-head">Stint eases urban life by offloading stressful daily tasks</div></div>
                        <img className="curve" src="./img/images/curve.png"/>
                        <div className="scroll-arrow">
                            <span/><span/><span/>
                        </div>
                    </div>
                    <div className="overview">What do you need to get done?</div>
                    <hr className="line" />
                    <div className="section">

                        <div className="post-heading">
                            <div className="title"><span className="uline">Things to consider</span> when buying gold jewellery</div>
                            <div className="info">
                                <div className="sub-heading">Cost per gram</div>
                                <div className="para">
                                    The first thing you need to do before you buy gold is find out its current price per gram.<br/><br/>
                                    Remember that gold prices can vary at different showrooms. This is because they come from different associations of gold .
                                </div>
                                <br/>
                                <div className="sub-heading">Purity</div>
                                <div className="para">
                                    Gold is available in different levels of purity, and this can affect gold price.
                                    <br/><br/>
                                    For instance, 22k gold is 91.6% gold as it contains 22 parts gold and 2 parts of other metal. Likewise, 18k gold  18 parts of gold while other metals make up the other 6 parts.
                                </div>
                                <br/>
                                <div className="sub-heading">Genuine Certification</div>
                                <div className="para">
                                    Gold that does not carry certification by BIS (Bureau of Indian Standard) may not be the real deal.
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <hr className="line"/><hr className="line thick"/>
                    <div className="section">
                        <div className="numeral">02</div>
                        <div className="post-heading">
                            <div className="title"><span className="uline">Unique selling points</span> that customers considered:</div>
                            <div className="info">
                                <div className="sub-heading">Making Charges</div>
                                <div className="para">
                                    <div className="quote"><img src="./img/quote.png"/></div>
                                    <div className="quote-text"><span className="uline">Making charge</span> is very high. Never believe in their chit if you terminate then you have to pay them 10%.. no Worth for your money. All corporate system. Don't waste you Money here.

                                    </div><br/>
                                </div>
                                <br/>
                                <div style={{fontSize: '12px', color: '#ababab', marginTop: '14px'}}><a style={{color:'#646262'}} href="https://www.google.com/maps/contrib/104264312657591042552/reviews/@12.9557065,77.7144749,17z/data=!3m1!4b1!4m3!8m2!3m1!1e1?hl=en-IN">Bala Vinayagam</a>, few months ago on <img className="logo-img" src="./img/google_logo.png"/></div>
                                <hr class="line"/>
                                <div className="sub-heading">Collections</div>
                                <div className="para">
                                    <div className="quote"><img style={{width: '34px'}} src="./img/quote.png"/></div>
                                                                        <div className="quote-text">Nice <span className="uline">collections</span>. Name it and it's there. Good offers also.

                                                                        </div><br/>
                                    <br/>
                                </div>
                                <br/>
                                <div style={{fontSize: '12px', color: '#ababab', marginTop: '14px'}}><a style={{color:'#646262'}}  href="https://www.google.com/maps/contrib/103591546070092898488/reviews?hl=en-IN&sa=X&ved=2ahUKEwjFiYO23N7kAhUL73MBHaLdA9gQvvQBegQIARAg">Spoorti gandhad</a>, few months ago on <img className="logo-img" src="./img/google_logo.png"/></div>
                                <hr class="line"/>
                                <div className="sub-heading">Designs</div>
                                <div className="para">
                                    <div className="quote"><img style={{width: '44px'}} src="./img/quote.png"/></div>
                                        <div className="quote-text">Many new <span className="uline">designs and styles</span> available so different weights and price. Certified purity of gold is guaranteed.

                                        </div><br/>
                                    <br/>
                                </div>
                                <div style={{fontSize: '12px', color: '#ababab', marginTop: '14px'}}><a style={{color:'#646262'}} href="https://www.google.com/maps/contrib/108943788022614341397/reviews?hl=en-IN&sa=X&ved=2ahUKEwjlhqKL3t7kAhUJ4nMBHeT6BZsQvvQBegQIARAo">Suresh</a>, few months ago on <img className="logo-img" src="./img/google_logo.png"/></div>
                                <hr class="line"/>
                            </div>
                            <div className="para" style={{marginTop: '0px'}}>Now that you've researched the essential aspects to pick the right jeweller, find out the most authentic & trusted jeweller for you.</div>
                            <br/><br/>
                            <div className="scroll-arrow">
                                <span/><span/><span/>
                            </div>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        </div>
                    </div>
                </div>


                {displayQuestions && questionList && questionList.length > 0 &&
                 <QuestionAnswer selectedAns={searchRequestPayLoad.questions || []} question={questionList[activeQuestionIndex].question} answers={questionList[activeQuestionIndex].responses} onSelect={this.onQuestionSelect} />}


            </div>);

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
    }

    getSearchQuery() {
        let searchQuery = window.location.search;
        if (typeof searchQuery === 'string') {
            return searchQuery.replace('?q=', '').split('+').join(' ');
        }
        return ''
    }

    checkVisible(elmId) {
      var rect = document.getElementById(elmId).getBoundingClientRect();
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      return !(rect.bottom < 44 || rect.top - viewHeight >= 0);
    }

    isScrollingDown() {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        var isDown = st > window.lastScrollTop;
        window.lastScrollTop = st <= 0 ? 0 : st;
        return isDown;
    }

    hasShowInterest() {
        return window.positiveOpinionClickCount[clickedResultElemId] >= 1;
    }

    handleScroll() {
            if(typeof window.clickedResultElemId != 'undefined') {
                //console.log('diff: ', document.querySelector('#'+clickedResultElemId).getClientRects()[0].y);
                //console.log('pageYOffset: ', window.pageYOffset);

                var nextClickIndex = window.clickedResultIndex;
                var scrollingDown = true;


                if(!this.checkVisible('heading'+(nextClickIndex-1)) && !this.checkVisible('res'+nextClickIndex) && !this.checkVisible('heading'+nextClickIndex)) {
                    document.getElementById('stickyHeader').innerHTML = document.getElementById('heading'+(nextClickIndex-1)).innerHTML;
                    document.getElementById('stickyHeader').style.display='inline';
                    if(this.hasShowInterest()) {
                        document.getElementById('stickyFooter').style.display='inline';
                    }
                } else {
                    document.getElementById('stickyHeader').style.display='none';
                    var subjectName = '';
                    if(document.getElementById('heading'+(clickedResultIndex-1)).children[0].innerHTML.split(' ').length > 1) {
                        subjectName = document.getElementById('heading'+(clickedResultIndex-1)).children[0].innerHTML.split(' ')[0] + ' ' + document.getElementById('heading'+(clickedResultIndex-1)).children[0].innerHTML.split(' ')[1]
                    } else {
                        subjectName = document.getElementById('heading'+(clickedResultIndex-1)).children[0].innerHTML.split(' ')[0];
                    }
                    document.getElementById('id_submit').value = 'Offers from '+subjectName;
                        + document.getElementById('heading'+(clickedResultIndex-1)).children[0].innerHTML.split(' ')[1];
                    document.getElementById('stickyFooter').style.display='none';
                }

                console.log('Cond 1: ', document.documentElement.scrollTop < 200);
                console.log('Cond 2: ', document.getElementById(window.clickedResultElemId).getClientRects()[0].top > 600);
                console.log('Cond 3: ', document.getElementById(window.clickedResultElemId).getClientRects()[0].top < -2000);

                if (document.documentElement.scrollTop < 200 ||
                    document.getElementById(window.clickedResultElemId).getClientRects()[0].top > 600 ||
                    document.getElementById(window.clickedResultElemId).getClientRects()[0].top < -2000) {
                    document.getElementById('stickyHeader').style.display='none';
                    document.getElementById('stickyFooter').style.display='none';
                }


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
        window.lastScrollTop = 0;
        window.positiveOpinionClickCount = new Array();
        window.addEventListener('scroll', this.handleScroll);
        document.querySelector('.loading').style.display = 'none';
        this.opinionClick = this.opinionClick.bind(this);
        this.setState({
            resultType: searchResults.resultType,
            resultList: searchResults.results,
            questionList: questions.results,
            shortlistText: searchResults.shortlistText,
            shortlistCount: searchResults.shortlistCount
        })
    }

    opinionClick() {
        window.positiveOpinionClickCount[clickedResultElemId] = window.positiveOpinionClickCount[clickedResultElemId] + 1;
        this.handleScroll();
    }

    expandResults(index) {
       document.querySelectorAll('.results-list').forEach(function(elem){ elem.classList.remove('expanded');});
       if(location.href.indexOf('#')==-1){
            window.originalUrl = location.href;
       }
       //location.href = window.originalUrl + '#res-shade-'+index;
       setTimeout(function(){document.getElementById('res'+this.i).classList.add('expanded');}.bind({i:index}),200);
       document.getElementById('res-shade-'+index).classList.add('hidden');
       document.querySelector('#'+'res'+index+' ul.qna li:first-child input').checked = true;


       window.clickedResultElemId = 'res'+index;
       window.clickedResultIndex = index+1;
       window.positiveOpinionClickCount[clickedResultElemId] = 0;


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
        const { questionList, activeQuestionIndex, shortlistCount, shortlistText, resultList, searchRequestPayLoad = [], resultType } = this.state;
        return (<div class="search-results-container">
            {questionList && questionList.length > 0 &&
                <QuestionAnswer selectedAns={searchRequestPayLoad.questions || []} question={questionList[activeQuestionIndex].question} answers={questionList[activeQuestionIndex].responses} onSelect={this.onQuestionSelect} />}
            <div className="row" style={{marginTop:'90px'}}>
                <div className="col-md-12 d-flex justify-content-end">
                    <span className="result-info">{shortlistCount}<span style={{fontWeight: 'normal', fontSize: '14px', color: '#a9a9a9'}}>{shortlistText}</span></span>
                </div>
                <hr className="line-shade" />
            </div>
            <div id="stickyHeader">
            </div>
            <div id="stickyFooter" className="sticky-footer">
                <form action="/search" method="get" className="landing_page">
                 <div id="div_id_submit" className="form-group">
                        <div className="controls">
                            <input type="submit" class="submit form-control" id="id_submit" value="Explore offers" />
                        </div>
                    </div>
                </form>
            </div>
            <div className="row">
                {resultList.map((resultItem, index) => {
                    return (<div className="col-sm-12 col-md-4">
                        <div id={`res${index}`} className="results-list">
                            <h3 id={`heading${index}`} ><Link to={`/search/details/${searchRequestPayLoad.query}`}>{resultItem.title}</Link><span className="sub-title">{resultItem.subTitle}</span></h3>

                                <ul className="qna">
                                {resultType != 'travel' &&
                                    resultItem.qna.map((qnaItem, index) => {
                                        return (
                                                <div>
                                                {index == 4 && <div className="verdict"><div className="title">Overall verdict</div><div className="detail">{resultItem.verdict}</div></div>}

                                                <li>
                                                <input id={`qna${index}${resultItem.title.replace(/ /g,'')}`} type="radio" name="list" />
                                                <label htmlFor={`qna${index}${resultItem.title.replace(/ /g,'')}`} onClick={this.opinionClick}>{qnaItem.question}</label><span className="qna-arrow"></span>
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

                                        </li></div>);
                                    })
                                }
                                </ul>

                                <div className="secondary-btn">{resultItem.title.split(' ').length > 1 ? 'Offers from ' + resultItem.title.split(' ')[0] + ' ' + resultItem.title.split(' ')[1] : 'Offers from ' + resultItem.title.split(' ')[0]}</div>

                                <div className="one" id="visible-block">
                                  <div className="overlay"></div>
                                  <div className="middle" id="visible">
                                    <div className="overlay2" onclick="rrr()"></div>
                                    <div className="two">
                                      ewfwfqw fdsfasd dsfsdfa dsfasdfa dfas dfas sdfadsf dfsafadsf
                                    </div>
                                  </div>
                                </div>
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
        <Route path="/" render={() => (
            <div className="results">
                    <Route exact path="/" component={Guide} />
                <Route exact path="/recommended" component={QuizWithRouter} />
            </div>)} />
    </div>
</Router>, document.getElementById('containerWiz'));