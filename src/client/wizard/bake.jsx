import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, withRouter, Link } from 'react-router-dom';

import { questions, conditionalQuestions } from '../../data-source/mockDataQnA';
import { useHistory } from "react-router-dom";

class ReviewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {activeIndex: 0, activeOptions: [], activeCrustIndex: 0, qty: 0};
        this.setActiveTopic = this.setActiveTopic.bind(this);
    }
    componentDidMount() {
    }
    setOpinionArray(topicName) {
        let reviewTopics = this.props.reviewTopics;
        let activeOpinions = [];
        reviewTopics.forEach((reviewTopic)=> {
            if(reviewTopic.topic == topicName) {
                activeOpinions = reviewTopic.opinions;
            }
        });
        this.setState({activeOpinions: activeOpinions});

    }
    setCrustPrice(crustIndex) {
        let crust = this.props.crustOptions[crustIndex].topic;
        let item = this.props.item;
        console.log('::Size::', this.props.reviewTopics[this.state.activeIndex].topic);
        console.log('::Crust::', crust);
        console.log('::Price::', this.props.reviewTopics[this.state.activeIndex]["pricing"][crust]);
        document.getElementById('price'+this.props.itemId).innerHTML = this.props.reviewTopics[this.state.activeIndex]["pricing"][crust] * (this.state.qty > 0 ? this.state.qty : 1);
        if(this.state.qty > 0){
            var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: this.props.crustOptions[crustIndex].topic, size: this.props.reviewTopics[this.state.activeIndex].topic, qty: this.state.qty, price: this.props.reviewTopics[this.state.activeIndex]["pricing"][crust] * this.state.qty, itemId: this.props.itemId}});
            document.dispatchEvent(event);
        }
    }
    setSizePrice(activeIndex) {
        let size = this.props.reviewTopics[activeIndex].topic;
        let item = this.props.item;
        console.log('::Size::', size);
        console.log('::Crust::', this.props.crustOptions[this.state.activeCrustIndex].topic);
        console.log('::Price::', this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size]);
        document.getElementById('price'+this.props.itemId).innerHTML = this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * (this.state.qty > 0 ? this.state.qty : 1);
        if(this.state.qty > 0){
            var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: this.props.crustOptions[this.state.activeCrustIndex].topic, size: this.props.reviewTopics[activeIndex].topic, qty: this.state.qty, price: this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * this.state.qty, itemId: this.props.itemId}});
            document.dispatchEvent(event);
        }
    }
    setActiveCrust(item, indexCrust) {
        console.log('index: ', indexCrust);
        this.setState({activeCrustIndex: indexCrust});
        this.setOpinionArray(item.topic);
    }
    setActiveTopic(item, index) {
            console.log('index: ', index);
            this.setState({activeIndex: index});
            this.setOpinionArray(item.topic);

            if(document.querySelector('#primaryImg'+this.props.itemId).className.indexOf('rotate') != -1) {
                document.querySelector('#primaryImg'+this.props.itemId).classList.remove('rotate');
            } else {
                document.querySelector('#primaryImg'+this.props.itemId).classList.add('rotate');
            }
            if (index == 1) {
                 document.querySelector('#primaryImg'+this.props.itemId).style.padding = '12px';
            } else if (index == 2) {
                 document.querySelector('#primaryImg'+this.props.itemId).style.padding = '21px';
            } else if (index == 0) {
                 document.querySelector('#primaryImg'+this.props.itemId).style.padding = '0px';
            }
        }
    showMore(e) {
        e.target.parentNode.classList.add('scrollable');
        e.target.style.display = 'none';
        e.target.parentNode.children[e.target.parentNode.children.length - 1].style.marginTop = '7px';
    }
    updatePrice(qty) {
        if(qty >= 1) {
            let size = this.props.reviewTopics[this.state.activeIndex].topic;
            document.getElementById('price'+this.props.itemId).innerHTML = this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * qty;
        }
    }
    getPrice(qty) {
        let size = this.props.reviewTopics[this.state.activeIndex].topic;
        return this.props.crustOptions[this.state.activeCrustIndex]["pricing"][size] * qty;
    }

    render() {
        let {reviewTopics, crustOptions, item, itemId} = this.props;
        let {activeIndex, activeCrustIndex, activeOpinions, qty} = this.state;
        let activeDefaultOpinions = [];
        console.log('reviewTopics[0]:', reviewTopics[0]);
        activeDefaultOpinions = reviewTopics[0].opinions;

        return (
          <div className="reviews-container">
              <div className="topic-container">
                {reviewTopics && reviewTopics.map((review, index) => {
                    return (
                        <React.Fragment>
                            <div className={activeIndex===index ? 'review-topic active': 'review-topic'} onClick={()=>{this.setActiveTopic(review, index);  this.setSizePrice(index); }}>
                                {review.topic}
                            </div>
                        </React.Fragment>
                    );
                })}
                </div>

                <div className="topic-container" style={{height: '76px'}}>
                    <div className="card-mini-title">Select your crust:</div>
                    {crustOptions && crustOptions.map((crust, indexCrust) => {
                        return (
                            <React.Fragment>
                                <div className={activeCrustIndex===indexCrust ? 'review-topic active-crust': 'review-topic'} onClick={()=>{this.setActiveCrust(crust, indexCrust); this.setCrustPrice(indexCrust); }}>
                                    {crust.topic}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="incrementer">
                    <div class="card-mini-title" >Quantity:</div>
                    <div class="quantity">
                        <a className="quantity__minus"><span onClick={()=>{if(this.state.qty>0){this.setState({qty: this.state.qty - 1});}this.updatePrice(this.state.qty - 1);var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: crustOptions[this.state.activeCrustIndex].topic, size: reviewTopics[this.state.activeIndex].topic, qty: this.state.qty - 1, price: this.getPrice(this.state.qty - 1), itemId: itemId}});document.dispatchEvent(event);}} style={{fontSize: '25px', lineHeight: '0px', marginLeft: '2px'}}>-</span></a>
                        <input name="quantity" type="text" disabled className="quantity__input" value={this.state.qty} />
                        <a className="quantity__plus"><span onClick={()=>{this.setState({qty: this.state.qty + 1});console.log('item:',item);var event = new CustomEvent('basket-updated', { detail: {name: item.title, crust: crustOptions[this.state.activeCrustIndex].topic, size: reviewTopics[this.state.activeIndex].topic, qty: this.state.qty + 1, price: this.getPrice(this.state.qty + 1), itemId: itemId}});document.dispatchEvent(event);this.updatePrice(this.state.qty + 1)}}>+</span></a>
                      </div>
                </div>
          </div>
        );
    }
}

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    appendZero(number) {
        if (number > 0 && number < 10) {
            return '0' + number;
        }
        return number;
    }

    render() {
        let {index, data} = this.props;
        return (
        <div className="card-container">
            <div className="section-one">
                <br/>
                <div className="top">
                    <div className="top-left">
                        <img id={`primaryImg${index}`} className="primary-img rotatable" src={`../../../img/images/p${index+1}.png`} />
                    </div>
                    <div className="top-right">
                        <div className="usp-title"></div>
                        <div className="usp-desc">{data.usp[0]}</div>
                    </div>
                </div>
            </div>
            <div className="title">{data.title}</div>
            <hr className="line"/>
            <div className="section-two">
                <div className="pricing"><label className="price"><span className="rupee">₹</span><span id={`price${index}`}>{data.qna[0].defaultPrice}</span></label></div>
                <div className="top">
                    <ReviewContainer reviewTopics={data.qna[0].responses} crustOptions={data.qna[0].crust} itemId={index} item={data} />
                </div>
            </div>
        </div>)
    }
}

class SummaryCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
    }
    appendZero(number) {
        if (number > 0 && number < 10) {
            return '0' + number;
        }
        return number;
    }

    render() {
        let {index, data} = this.props;
        return (
        <div className="card-container small" style={{padding: '0px 12px 0px 12px'}}>
            <div className="section-one">
                <div className="top">
                    <div className="top-left">
                        <img id={`primaryImg${index}`} className="primary-img rotatable" src={`../../../img/images/p${data.itemId+1}.png`} style={{width: '72px',paddingTop: '0px'}} />
                    </div>
                    <div className="top-right">
                        <div className="usp-title"><div className="title">{data.name}</div></div>
                        <div className="usp-desc">{data.qty} {data.size} pizza(s)</div>
                    </div>
                </div>
            </div>

            <div className="section-two small">
                <div className="pricing"><label className="price"><span className="rupee">₹</span><span id={`price${index}`}>{data.price}</span></label></div>
                <div className="top">
                </div>
            </div>
        </div>)
    }
}


class Bake extends Component {

    constructor() {
        super();
        this.state = {
            activeStep: 1
        };
    }
    componentDidMount() {
        console.log('mounted');
    }

    processFile(dataURL, fileType, currentStep) {
    	var maxWidth = 1900;
    	var maxHeight = 1000;

    	var image = new Image();
    	image.src = dataURL;

    	image.onload = function () {
    		var width = image.width;
    		var height = image.height;
    		var shouldResize = (width > maxWidth) || (height > maxHeight);

    		if (!shouldResize) {
    			this.sendFile(dataURL, currentStep);
    			return;
    		}

    		var newWidth;
    		var newHeight;

    		if (width > height) {
    			newHeight = height * (maxWidth / width);
    			newWidth = maxWidth;
    		} else {
    			newWidth = width * (maxHeight / height);
    			newHeight = maxHeight;
    		}

    		var canvas = document.createElement('canvas');

    		canvas.width = newWidth;
    		canvas.height = newHeight;

    		var context = canvas.getContext('2d');

    		context.drawImage(image, 0, 0, newWidth, newHeight);

    		dataURL = canvas.toDataURL(fileType);

            if(currentStep == 1) {
                this.selfie1DataUrl = dataURL;
            }
    		this.sendFile(dataURL, currentStep);
    	}.bind(this);

    	image.onerror = function () {
    		alert('There was an error processing your file!');
    	};
    }

    sendFile(dataURL, currentStep) {
        console.log('--sending photo---', dataURL);
        //var formData = new FormData();
        //formData.append('imageData', dataURL);
        var http = new XMLHttpRequest();
                var url = '/selfie';
                var params = 'dataURL='+dataURL;
                if (currentStep == 2) {
                    url = 'closeUpPhoto';
                    params = 'dataURL='+this.selfie1DataUrl+'&closeUpPhotoDataURL='+dataURL;
                }
                http.open('POST', url, true);
                http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                http.onreadystatechange = function() {//Call a function when the state changes.
                    if(http.readyState == 4 && http.status == 200) {
                        console.log('order creation post response:', http.responseText);
                        var res = http.responseText;
                        console.log('-----res-----', res);

                        if (currentStep == 2) {
                            document.getElementById('pizzaPhoto').src = res;
                            document.getElementById('step2').classList.add('done');
                            document.getElementById('step3').classList.add('done');
                            document.getElementById('step3Circle').classList.add('active');
                            document.getElementById('checkoutBtnStep2').style.display = 'block';
                            document.getElementById('checkoutBtnStep2').download = document.getElementById('pizzaPhoto').src;
                            document.getElementById('checkoutBtnStep2').href = document.getElementById('pizzaPhoto').src;
                        } else {
                            document.getElementById('selfie1').src = res;
                        }
                        document.getElementById('checkoutBtnSelfie').style.display = 'block';
                    }
                }.bind(this);
                http.send(params);
    }

    readFile(file) {
        var reader = new FileReader();

        reader.onloadend = function () {
            this.processFile(reader.result, file.type, this.state.activeStep);
        }.bind(this);

        reader.onerror = function () {
            alert('There was an error reading the file!');
        }

        reader.readAsDataURL(file);
    }

    onSelfieUpload(e) {
        document.getElementById('msg1').innerHTML = 'Processing photo, please wait...';
        var file = e.target.files[0];

        		if (file) {
        			if (/^image\//i.test(file.type)) {
        				this.readFile(file);
        			} else {
        				alert('Not a valid image!');
        			}
        		}
    }

    onPizzaPhotoUpload(e) {
        document.getElementById('msg2').innerHTML = 'Processing photo, please wait...';
        var file = e.target.files[0];

        if (file) {
            if (/^image\//i.test(file.type)) {
                this.readFile(file);
            } else {
                alert('Not a valid image!');
            }
        }

    }

    render() {
        const {showLoader, results, orderSummary, showCoupon, showSlot} = this.state;
        console.log('orderSummary: ', orderSummary);
        let loaderElems = [];
        for(var i=0; i<14; i++) {
            loaderElems.push(<div className="slice"></div>)
        }

        return (<div>
                    <img className="icon-back" src="../../../img/images/ic_back.png" onClick={()=>{history.back(-1);}} />
                    <img id="logo" className="logo-img" src="../img/images/logohp4.png" />
                    <div id="checkoutHeader">
                        <div id="checkoutBtn" className="card-btn checkout" onClick={()=>{document.getElementById('checkoutModal').style.top='-20px';this.setState({orderSummary: localStorage.getItem('basket') != null ? JSON.parse(localStorage.getItem('basket')) : []});document.getElementById('logo').style.top='21px';}}>Checkout&nbsp;→
                            <div className=""></div>
                            <div id="checkoutCount" class="c-count">0</div>
                        </div>
                    </div>
                    <div className="banner2"/>
                    <div className="logo" id="logoWrapper">
                        <div id="logoHeading" className="logo-heading"></div>
                        <Link to="/mytasks"><div id="myTasksBtn" className="green-btn right-btn"><img className="icon-btn" src="../img/images/ic_user.png" /><span>My Services</span></div></Link>
                    </div>

                    <div><i className="loading" id="myTasksLoader" style={{top: '28px'}}></i></div>
                    <div className="main fadeInBottom">
                        <hr className="line-tasks"/>
                        <div id="checkoutModal" className="card-container checkout-modal modal-show">
                            <div className="modal-heading">

                            </div>

                              {this.state.activeStep == 1 &&
                              <div className="checkout-content">
                                <div className="icon-camera">
                                    <label><img src="./../../img/images/ic_bake.png"/></label>
                                    <br/>
                                    <span id="msg1" style={{fontWeight: 'bold', fontSize: '22px', width: '300px'}}>Easy baking instructions</span>

                                    <span style={{fontWeight: 'bold',top: '120px'}}>Step 1: Preheat your non-stick pan on low flame for 5 minutes</span>
                                    <span style={{fontWeight: 'bold',top: '220px'}}>Step 2: Slide the pizza from the packaging smoothly into the pan</span>
                                    <span style={{fontWeight: 'bold',top: '320px'}}>Final Step: Cook in low flame for 5 to 8 minutes until the crust is golden brown!</span>

                                </div>

                              </div>}



                        </div>



                    </div><div className="credits"> © 2020 homely.pizza</div>
                <br/>
                </div>)
    }
}

var BakeWithRouter = withRouter(Bake);

render(<Router>
    <div>
        <Route path="/bake" render={() => (
            <div className="results">
                <Route path="/bake" component={BakeWithRouter} />
            </div>)} />
    </div>
</Router>, document.getElementById('containerWiz'));