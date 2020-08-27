import React, { Component } from 'react';
import { render } from 'react-dom';
import Shortlists from './shortlists.jsx';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

class Guide extends React.Component {

    constructor() {
        super();
        this.state = {
            activeQuestionIndex: 0,
        };
    }

    componentDidMount() {
        localStorage.setItem('discountCode', '');
        if(location.href.indexOf('amrit15') != -1
           || location.href.indexOf('pratu15') != -1
           || location.href.indexOf('srini15') != -1
           || location.href.indexOf('ragen15') != -1) {
            var referralCode = location.href.substring(location.href.indexOf('?r=')+3, location.href.length);
            localStorage.setItem('discountCode', referralCode);
        }

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


    handleScroll() {
        if(window.scrollY == 0) {
            document.querySelector('#overviewBgMain').style.display = 'none';
            document.querySelector('.scroll-arrow').style.display = 'inline';
            document.querySelector('#overviewMain').style.fontSize = '22px';
            document.querySelector('#overviewMain').innerHTML = '❤️ Loved by customers for Zero additive preparation';
            document.querySelector('#overviewMain').classList.remove('line-typed');
            document.querySelector('#overviewMain').classList.remove('anim-typewriter');
            document.querySelector('.confetti').style.opacity = '0';
        } else {
            document.querySelector('.scroll-arrow').style.display = 'none';
            document.querySelector('#overviewBgMain').style.display = 'inline-block';
            /*document.querySelector('#overviewMain').classList.add('line-typed');
            document.querySelector('#overviewMain').classList.add('anim-typewriter');
            document.querySelector('#overviewMain').style.fontSize = '26px';
            document.querySelector('#overviewMain').innerHTML = 'Say hello to Homely!'*/
            if(window.scrollY >= 500 & window.scrollY <= 700) {
                document.querySelector('.confetti').style.opacity = '1';
            }
            if(window.scrollY >= 1807) {
                document.querySelector('.second-section').style.opacity = '0';
            } else {
                document.querySelector('.second-section').style.opacity = '1';
            }
            if(window.scrollY >= 100) {
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
                <a href="/mytasks"><div id="myTasksBtn" className="green-btn right-btn"><img className="icon-btn" src="../img/images/ic_user.png" /><span>My Services</span></div></a>
            </div>
            <div><i className="loading"></i></div>



                <div className="main">
                    <div>

                        <div className="header" onClick={()=>{location.href='/order';}}>Authentic pizzas from fresh ingredients<br/></div>
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
                                ❤️ Loved by customers for Zero additive preparation
                            </div>
                        </div>
                        <div className="info" style={{marginTop: '80px',minHeight:'400px'}}>
                             <section className="slider" style={{paddingTop: '20px'}}>

                                                      <input type="radio" name="slider" id="slide-1" className="slider__radio" />
                                                      <input type="radio" name="slider" id="slide-2" className="slider__radio" />
                                                      <input
                                                        type="radio"
                                                        name="slider"
                                                        id="slide-3"
                                                        className="slider__radio"
                                                        checked
                                                      />

                                                      <div className="slider__holder">

                                                        <label for="slide-1" className="slider__item slider__item--1 card">
                                                          <div className="slider__item-content">
                                                            <img src="./img/images/t1.png" className="testim"/>
                                                            <p className="heading-3 heading-3--light">Development</p>
                                                            <p className="heading-3">SCSS Only slider</p>
                                                            <p className="slider__item-text serif">
                                                            The name itself sums up aptly...it's homely n yummilicious. we loved every bite of it.
                                                            I had ordered for pineapple mist with thin crust, large, Bell pepper blast, thick crust and cheesy garlic . It was tasty.l would definitely recommend this to all my near and dear ones,,😊😊

                                                             </p>
                                                            <a
                                                              className="heading-3 link"
                                                              href="https://www.facebook.com/homely.pizza/reviews/?ref=page_internal"
                                                              >via Facebook Reviews</a
                                                            >
                                                          </div>
                                                        </label>

                                                        <label for="slide-2" className="slider__item slider__item--2 card">
                                                          <div className="slider__item-content">
                                                            <img src="./img/images/t2.jpg" className="testim"/>
                                                            <p className="slider__item-text serif" style={{paddingTop: '300px'}}>
                                                                Good quality , true to its name, homely pizza. innovative pineapple pizza.
                                                            </p>
                                                            <a
                                                              className="heading-3 link"
                                                              href="https://www.facebook.com/homely.pizza/reviews/?ref=page_internal"
                                                              >via Facebook Reviews</a
                                                            >
                                                          </div>
                                                        </label>

                                                        <label for="slide-3" className="slider__item slider__item--3 card">
                                                          <div className="slider__item-content">
                                                            <img src="./img/images/t1.png" className="testim"/>
                                                            <p className="slider__item-text serif">
                                                                The name itself sums up aptly...it's homely n yummilicious. we loved every bite of it.
                                                                I had ordered for pineapple mist with thin crust, large, Bell pepper blast, thick crust and cheesy garlic . It was tasty.l would definitely recommend this to all my near and dear ones,,😊😊

                                                            </p>
                                                            <a
                                                              className="heading-3 link"
                                                              href="https://www.facebook.com/homely.pizza/reviews/?ref=page_internal"
                                                              >via Facebook Reviews</a
                                                            >
                                                          </div>
                                                        </label>

                                                      </div>

                                                      <div className="bullets">
                                                        <label for="slide-1" className="bullets__item bullets__item--1"></label>
                                                        <label for="slide-2" className="bullets__item bullets__item--2"></label>
                                                        <label for="slide-3" className="bullets__item bullets__item--3"></label>
                                                      </div>
                                                    </section>
                        </div>
                    </div>
                </div>

                <div className="section no-padding" style={{marginTop: '-70px'}}>
                    <div className="post-heading">
                        <div className="info" style={{marginTop: '-12px'}}>


                         <div className="info" style={{marginTop: '40px',minHeight:'300px'}}>
                             <div className="overview bg-text" style={{marginTop: '1025px', display: 'inline-block'}} id="overviewBgMain">
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
                                      <div className="overview bg-text" style={{marginTop: '925px', display: 'inline-block', fontSize: '20px'}} id="overviewBgMain">
                                           Thanks to our custom baking technique, our customers enjoy a hot pizza by simply warming it on a pan for 3 to 5 mins without the pizza losing any flavor!
                                      </div>
                                      <div class="images-wrapper" style={{marginTop: '560px'}}>
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


                </div>

                <br/>
                <div className="credits"> © 2020 homely.pizza</div>
                </div>



            </div>);

    }
}

var ShortlistsWithRouter = withRouter(Shortlists);

render(<Router>
    <div>
        <Route path="/" render={() => (
            <div className="results">
                    <Route exact path="/" component={Guide} />
                <Route path="/order/" component={ShortlistsWithRouter} />
                <Route path="/redirect/" component={ShortlistsWithRouter} />
                <Route path="/credits/" component={ShortlistsWithRouter} />
            </div>)} />
    </div>
</Router>, document.getElementById('containerWiz'));