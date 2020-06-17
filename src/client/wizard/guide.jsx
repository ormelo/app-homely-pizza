import React, { Component } from 'react';
import { render } from 'react-dom';
import Book from './book.jsx';
import MyTasks from './mytasks.jsx';
import Shortlists from './shortlists.jsx';
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
        this.showMyTasksBtn();
        scrollTo(document.body, 0, 100);
        document.addEventListener('DOMContentLoaded', () => {
                        let controller = new ScrollMagic.Controller();

                      let t1 = gsap.timeline();
                            t1.from(".section_1_01", 4, {
                                y: -100,
                                x: -150,
                                ease: Power3.easeInOut
                            })
                            t1.from(".section_1_02", 4, {
                                y: -150,
                                x: -250,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .from(".section_1_03", 4, {
                                y: -80,
                                x: -100,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .from(".section_1_04", 4, {
                                y: -100,
                                x: -150,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .from(".section_1_05", 4, {
                                y: -80,
                                x: -200,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .from(".section_1_06", 4, {
                                y: -100,
                                x: -350,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .from(".section_1_07", 4, {
                                y: -50,
                                x: -150,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .from(".section_1_08", 4, {
                                y: 50,
                                x: -350,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .from(".section_1_09", 4, {
                                y: 100,
                                x: -200,
                                ease: Power3.easeInOut
                            }, '-=4')

                        let scene = new ScrollMagic.Scene({
                            triggerElement: '.first-section',
                            duration: '100%',
                            triggerHook: 0,
                            offset: '300'
                        })
                            .setTween(t1)
                            .setPin('.first-section')
                            .addTo(controller);

                        let t2 = gsap.timeline();
                        t2
                            .to('.top .image-container', 4, {
                                height: 0
                            });

                        let scene2 = new ScrollMagic.Scene({
                            triggerElement: '.second-section',
                            duration: '100%',
                            triggerHook: 0,
                            offset: '10'
                        })
                            .setTween(t2)
                            .setPin('.second-section')
                            .addTo(controller);

                        let t3 = gsap.timeline();
                        t3
                            .to('.section_3_01', 4, {
                                y: -250,
                                ease: Power3.easeInOut
                            })
                            .to('.section_3_02', 4, {
                                y: -200,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .to('.section_3_03', 4, {
                                y: -100,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .to('.section_3_04', 4, {
                                y: 0,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .to('.section_3_05', 4, {
                                y: 150,
                                ease: Power3.easeInOut
                            }, '-=4')
                            .to('.section_3_06', 4, {
                                y: 250,
                                ease: Power3.easeInOut
                            }, '-=4')

                        let scene3 = new ScrollMagic.Scene({
                            triggerElement: '.third-section',
                            duration: '100%',
                            triggerHook: 0,
                            offset: '200'
                        })
                            .setTween(t3)
                            .setPin('.third-section')
                            .addTo(controller);

                        let t4 = gsap.timeline();
                        t4
                            .to('.section_4_01', 4, {
                                autoAlpha: 0
                            })
                            .from('.section_4_02', 4, {
                                autoAlpha: 0
                            }, '-=4')
                            .from('.section_4_03', 4, {
                                autoAlpha: 0
                            })
                            .from('.section_4_04', 4, {
                                autoAlpha: 0
                            })

                        let scene4 = new ScrollMagic.Scene({
                            triggerElement: '.forth-section',
                            duration: '10%',
                            triggerHook: 0,
                            offset: '0'
                        })
                            .setTween(t4)
                            .setPin('.forth-section')
                            .addTo(controller);
                    });
    }

    showMyTasksBtn() {
        if(localStorage.getItem('primary-task') != null && localStorage.getItem('secondary-task') != null
            && window.location.href.indexOf('navigatingBack=true') != -1
            && document.getElementById('myTasksBtn') != null) {
            document.getElementById('myTasksBtn').style.display = 'block';
        } else if(localStorage.getItem('primary-task') != null && localStorage.getItem('secondary-task') != null
              && window.location.href.indexOf('navigatingBack=true') == -1
              && document.getElementById('myTasksBtn') != null) {
            location.href = '/mytasks';
        }
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
            document.querySelector('#overviewBgMain').style.display = 'none';
            document.querySelector('.scroll-arrow').style.display = 'inline';
            document.querySelector('#overviewMain').style.fontSize = '22px';
            document.querySelector('#overviewMain').innerHTML = 'What if you could bake it instantly at home?'
            document.querySelector('#overviewMain').classList.remove('line-typed');
            document.querySelector('#overviewMain').classList.remove('anim-typewriter');
            document.querySelector('.confetti').style.opacity = '0';
        } else {
            document.querySelector('.scroll-arrow').style.display = 'none';
            document.querySelector('#overviewBgMain').style.display = 'inline-block';
            document.querySelector('#overviewMain').classList.add('line-typed');
            document.querySelector('#overviewMain').classList.add('anim-typewriter');
            document.querySelector('#overviewMain').style.fontSize = '26px';
            document.querySelector('#overviewMain').innerHTML = 'Say hello to Homely!'
            if(window.scrollY >= 500 & window.scrollY <= 700) {
                document.querySelector('.confetti').style.opacity = '1';
            }
            if(window.scrollY >= 1807) {
                document.querySelector('.second-section').style.opacity = '0';
            } else {
                document.querySelector('.second-section').style.opacity = '1';
            }
            if(window.scrollY >= 4040) {
                document.querySelector('#ctaSection').style.position = 'fixed';
                document.querySelector('#ctaSection').style.bottom = '0px';
            } else {
                document.querySelector('#ctaSection').style.position = 'relative';
                document.querySelector('#ctaSection').style.bottom = 'none';
            }
        }
    }

    render() {
            const { questionList, activeQuestionIndex, searchRequestPayLoad = [], displayQuestions } = this.state;
            return (<div>

            <img id="logo" className="logo-img" src="../img/images/logohp4.png" />
            <div className="banner2"/>
            <div className="logo" id="logoWrapper">
                <div id="logoHeading" className="logo-heading"></div>
                <Link to="/mytasks"><div id="myTasksBtn" className="green-btn right-btn"><img className="icon-btn" src="../img/images/ic_user.png" /><span>My Services</span></div></Link>
            </div>
            <div><i className="loading"></i></div>



                <div className="main">
                    <div>

                        <div className="header">Craving a hot pizza straight out of the pan?<br/></div>
                        <div className="smoke-main">
                            <svg version='1.1' xmlns='http://www.w3.org/2000/svg'>
                              <filter id='blur'>
                                <fegaussianblur stddeviation='10'></fegaussianblur>
                              </filter>
                            </svg>
                            <div className="h">
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                              <div className="c"></div>
                            </div>
                        </div>
                        <div className="pizza-main-img"><img src="../img/images/fresh_pizz01.png" className="pizza-img" /></div>
                        <div className="scroll-arrow">
                            <span/><span/><span/>
                        </div>
                    </div>
                    <br/><br/>
                <div className="section" style={{marginTop: '400px', minHeight: '190px'}}>
                    <div className="post-heading">

                        <div className="info" style={{marginTop: '70px'}}>
                            <div className="overview" style={{marginTop: '30px'}} id="overviewMain">
                                What if you could bake it instantly at home?
                            </div>
                        </div>
                        <div className="info" style={{marginTop: '10px',minHeight:'300px'}}>
                            <div className="overview bg-text" style={{marginTop: '130px'}} id="overviewBgMain">
                                Freshly prepped pizza ingredients in a box, delivered for instant cooking!
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section no-padding" style={{marginTop: '-70px'}}>
                    <div className="post-heading">
                        <div className="info" style={{marginTop: '-12px'}}>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            <img src="./img/images/pizzabox.png"  className="pizza-box"/>
                            <img src="./img/images/confetti.png"  className="confetti"/>
                            <img src="./img/images/ic_num_1.png" className="ic-num"/>
                            <img className="curve small" src="./img/images/curve.png"/>
                            <div className="para section leaves">
                         </div>

                         <div className="info" style={{marginTop: '40px',minHeight:'300px'}}>
                             <div className="overview bg-text" style={{marginTop: '425px', display: 'inline-block'}} id="overviewBgMain">
                                 With zero preservatives, all the ingredients are freshly prepped just on receiving your order
                             </div>
                              <section className="second-section">
                                                                                  <div className="images-wrapper bottom">
                                                                                      <div className="image-container">
                                                                                          <img className="section_2_06" src="./img/images/section_2_06.png?raw=1" />
                                                                                      </div>
                                                                                      <div className="image-container">
                                                                                          <img className="section_2_07" src="./img/images/section_2_07.png?raw=1" />
                                                                                      </div>
                                                                                      <div className="image-container">
                                                                                          <img className="section_2_08" src="./img/images/section_2_08.png?raw=1" />
                                                                                      </div>
                                                                                      <div className="image-container">
                                                                                          <img className="section_2_09" src="./img/images/section_2_09.png?raw=1" />
                                                                                      </div>
                                                                                      <div className="image-container">
                                                                                          <img className="section_2_10" src="./img/images/section_2_10.png?raw=1" />
                                                                                      </div>
                                                                                  </div>
                                                                                  <div className="images-wrapper top">
                                                                                      <div className="image-container">
                                                                                          <img className="section_2_01" src="./img/images/section_2_01.png?raw=1" />
                                                                                      </div>
                                                                                      <div className="image-container">
                                                                                          <img className="section_2_02" src="./img/images/section_2_02.png?raw=1" />
                                                                                      </div>
                                                                                      <div className="image-container">
                                                                                          <img className="section_2_03" src="./img/images/section_2_03.png?raw=1" />
                                                                                      </div>
                                                                                      <div className="image-container">
                                                                                          <img className="section_2_04" src="./img/images/section_2_04.png?raw=1" />
                                                                                      </div>
                                                                                      <div className="image-container">
                                                                                          <img className="section_2_05" src="./img/images/section_2_05.png?raw=1" />
                                                                                      </div>
                                                                                  </div>
                                                                              </section>
                              <section class="third-section">
                                      <div className="overview bg-text" style={{marginTop: '25px', display: 'inline-block'}} id="overviewBgMain">
                                           What's more, your pizza is pre-assembled so it's ready for instant cooking!
                                      </div>
                                      <div class="images-wrapper" style={{marginTop: '460px'}}>
                                          <img class="section_3_06" src="./img/images/section_3_06.webp?raw=1" />
                                          <img class="section_3_05" src="./img/images/section_3_05.webp?raw=1" />
                                          <img class="section_3_04" src="./img/images/section_3_04.webp?raw=1" />
                                          <img class="section_3_03" src="./img/images/section_3_03.webp?raw=1" />
                                          <img class="section_3_02" src="./img/images/section_3_02.webp?raw=1" />
                                          <img class="section_3_01" src="./img/images/section_3_01.webp?raw=1" style={{width: '40%'}} />
                                      </div>
                                  </section>
                         </div>

                         <section class="forth-section">
                                 <div className="overview bg-text" style={{marginTop: '-110px', display: 'inline-block'}} id="overviewBgMain">
                                    Simply bake it in an oven or place in a cooker in low flame without weight.
                                    <br/><br/>
                                    Your piping <b>HOT</b> pizza is usually ready in 12 mins!
                                 </div>
                                 <div class="images-wrapper">
                                     <img src="./img/images/protate.gif" style={{width: '250px'}}/>
                                 </div>
                                 <div className="smoke-sec" >
                                     <svg version='1.1' xmlns='http://www.w3.org/2000/svg'>
                                       <filter id='blur'>
                                         <fegaussianblur stddeviation='10'></fegaussianblur>
                                       </filter>
                                     </svg>
                                     <div className="h">
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                       <div className="c"></div>
                                     </div>
                                 </div>
                             </section>

                             <section class="forth-section" style={{height: '100px'}}>
                                                              <div className="overview bg-text" style={{marginTop: '-410px', display: 'inline-block'}} id="overviewBgMain">
                                                                 Choose from 15+ mouth-watering varieties or customize your own!
                                                              </div>
                             </section>
                             <section id="ctaSection" class="forth-section" style={{height: '100px'}}>
                                     <div onClick={()=>{location.href = '/order/';}} class="btn">Order Now&nbsp;→
                                       <div class="btn2"></div>
                                     </div>
                             </section>
                        </div>
                    </div>


                </div>DGD

                <br/>
                </div>


                {
                false ? <QuestionAnswer selectedAns={searchRequestPayLoad.questions || []} question={questionList[activeQuestionIndex].question} answers={questionList[activeQuestionIndex].responses} onSelect={this.onQuestionSelect} /> : null}


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
        //this.handleScroll = this.handleScroll.bind(this);
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
        });
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
        return (<div className="search-results-container">
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
                            <input type="submit" className="submit form-control" id="id_submit" value="Explore offers" />
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

var QuizWithRouter = withRouter(Book);
var MytasksWithRouter = withRouter(MyTasks);
var ShortlistsWithRouter = withRouter(Shortlists);

render(<Router>
    <div>
        <Route path="/" render={() => (
            <div className="results">
                    <Route exact path="/" component={Guide} />
                <Route exact path="/home" component={QuizWithRouter} />
                <Route exact path="/mytasks" component={MytasksWithRouter} />
                <Route path="/order/" component={ShortlistsWithRouter} />
            </div>)} />
    </div>
</Router>, document.getElementById('containerWiz'));