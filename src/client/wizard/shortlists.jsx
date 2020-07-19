import React, { Component } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

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


class Shortlists extends Component {

    constructor() {
        super();
        this.state = {
            value: 0,
            results: [],
            activeStep: 1,
            showCoupon: false,
            couponApplied: false,
            showSlot: false,
            slotSelected: 'Saturday, 1:30PM - 2.30PM',
            orderSummary: localStorage.getItem('basket') != null ? JSON.parse(localStorage.getItem('basket')) : []
        };
    }
    componentDidMount() {
        this.fetchJson();
        localStorage.removeItem("basket");
        var winHeight = window.innerHeight;

        window.addEventListener("scroll",function () {
            if(window.scrollY <= 120) {
                document.querySelector("#checkoutHeader").style.top = "0px";
                document.querySelector("#logo").style.top = "91px";
                document.querySelectoe('.announcement').style.display = 'block';
            } else {
                document.querySelector("#checkoutHeader").style.top = (window.scrollY-65)+"px";
                document.querySelector("#logo").style.top = "21px";
                document.querySelectoe('.announcement').style.display = 'none';
            }
        });

        document.addEventListener('basket-updated', function(e) {
            console.log('basket-updated event', e.detail);
            var currBasketData = localStorage.getItem("basket");
            var basketData;
            if(currBasketData == null) {
                 basketData = new Object();
            } else {
                basketData = JSON.parse(currBasketData);
            }
            if(e.detail != null) {
                console.log('e.detail.itemId: ', e.detail.itemId);
                console.log('e.detail.qty: ', e.detail.qty);
                if (e.detail.qty <=0 && basketData[e.detail.itemId] != null) {
                    delete basketData[e.detail.itemId];
                    document.getElementById('checkoutCount').innerHTML = Object.keys(basketData).length;
                    if (Object.keys(basketData).length == 0) {
                        document.getElementById('checkoutHeader').style.display = 'none';
                    }
                } else {
                    basketData[e.detail.itemId] = e.detail;
                }
            }

            if(Object.keys(basketData).length >= 1) {
                document.getElementById('checkoutHeader').style.display = 'inline';
                document.getElementById('checkoutCount').innerHTML = Object.keys(basketData).length;
            }
            var basketStr = JSON.stringify(basketData);
            localStorage.setItem("basket",basketStr)
        });
    }
    fetchJson() {
        console.log('this.props.match: ', this.props.match);
        let task = 'interior';
        let loc = 'blr';
        let zone = 'east';

        axios.get(`/data/${task}/${loc}/${zone}`)
          .then(function (response) {
            console.log(response.data);
            this.setState({results: response.data.results});
          }.bind(this));
    }
    getTotal() {
        let orderSummary = this.state.orderSummary;
        let total = 0;
        orderSummary && Object.keys(orderSummary).map((index) => {
            if(typeof index !== 'undefined') {
                total += orderSummary[index].price;
            }
        });
        total = total + (0.04*total) + 75;
        if(!this.state.couponApplied) {
            localStorage.setItem('dPrice', Math.round(total));
        }
        return Math.round(total);
    }
    applyCoupon() {
        let curPrice = document.getElementById('price').innerHTML;
        let couponCode = document.getElementById('dCoupon').value;
        if(!this.state.couponApplied && couponCode != '' && couponCode.toUpperCase() == 'SLICE20') {
            curPrice = parseInt(curPrice,10);
            let revPrice = curPrice - curPrice * .2;;
            revPrice = Math.round(revPrice);
            document.getElementById('price').innerHTML = revPrice;
            localStorage.setItem('dPrice', revPrice);
            this.setState({couponApplied: true});
        }
    }
    selectSlot() {
        var e = document.getElementById("slots");
        var slot = e.options[e.selectedIndex].value;
        this.setState({slotSelected: slot});
    }
    captureAddress() {
        let pincode = document.getElementById('dPincode').value;

        let address = document.getElementById('dAddress').value;
        let mobile = document.getElementById('dMobile').value;
        let name = document.getElementById('dName').value;
        localStorage.setItem('dPincode',pincode);
        localStorage.setItem('dAddress',address);
        localStorage.setItem('dMobile',mobile);
        localStorage.setItem('dName',name);
        let price = localStorage.getItem('dPrice');
        let slot = localStorage.getItem('dSlot') != null ? localStorage.getItem('dSlot') : '';
        let summary = localStorage.getItem('basket');
        summary = summary != null ? summary : '';
        //create order
        var http = new XMLHttpRequest();
        var url = '/homelyOrder';
        var params = 'price='+price+'&mobile='+localStorage.getItem('dMobile')+'&name='+localStorage.getItem('dName')+'&slot='+slot+'&summary='+summary+'&pincode='+pincode+'&address='+address;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log('order creation post response:', http.responseText);
                var res = http.responseText;
                if(!pincode.includes('560')) {
                    alert('Sorry, our slots are full for this Saturday. Pls check back again on Sunday for upcoming week!');
                    location.href = '/';
                }
                if(res != null){
                    res = JSON.parse(res);
                    /*if(res.whitelisted == false) {
                        alert("Sorry, we're not able to deliver to your location temporarily!");
                        this.setState({activeStep: 2});
                    } else {*/
                        document.getElementById('step3Circle').classList.add('active');this.setState({showSlot: true, activeStep: 3});
                        localStorage.setItem('orderId', res.orderId);
                    /*}*/
                }
            }
        }.bind(this);
        http.send(params);
    }
    makePaymentRequest() {
        var http = new XMLHttpRequest();
        var url = '/paymentRequest';
        var orderId = 0;
        orderId = localStorage.getItem('orderId') != null ? localStorage.getItem('orderId') : orderId;
        var params = 'amount='+localStorage.getItem('dPrice')+'&phone='+localStorage.getItem('dMobile')+'&name='+localStorage.getItem('dName')+'&orderId='+orderId+'&slot='+this.state.slotSelected;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log('post response:', http.responseText);
                var res = http.responseText;
                res = JSON.parse(res);
                localStorage.setItem('paymentLink',res.payment_request.longurl);
                localStorage.setItem('paymentRequestId', res.payment_request.id);

                location.href = res.payment_request.longurl;
            }
        }
        http.send(params);
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
                    <div class="announcement">  Due to ongoing COVID-19 crisis, we're only able to deliver on weekends on non-curfew days.</div>
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
                                <div className="right" onClick={()=>{document.getElementById('checkoutModal').style.top='1200px';this.setState({activeStep: 1, showCoupon: false, showSlot: false, couponApplied: false});document.getElementById('logo').style.top='91px';}}>
                                    <img src="../../../img/images/ic_close.png" />
                                </div>
                            </div>
                            <div className="md-stepper-horizontal orange">
                                <div id="step1" className="md-step">
                                  <div className="md-step-circle active"><span>1</span></div>
                                  <div className="md-step-title">Order Summary</div>
                                  <div className="md-step-bar-left"></div>
                                  <div className="md-step-bar-right"></div>
                                </div>
                                <div id="step2" className="md-step">
                                  <div className="md-step-circle" id="step2Circle"><span>2</span></div>
                                  <div className="md-step-title">Delivery Address</div>
                                  <div className="md-step-bar-left"></div>
                                  <div className="md-step-bar-right"></div>
                                </div>
                                <div id="step3" className="md-step">
                                  <div className="md-step-circle" id="step3Circle"><span>3</span></div>
                                  <div className="md-step-title">Make Payment</div>
                                  <div className="md-step-bar-left"></div>
                                  <div className="md-step-bar-right"></div>
                                </div>
                              </div>
                              {this.state.activeStep == 1 &&
                              <div className="checkout-content">
                                {orderSummary && Object.keys(orderSummary).map((index) => {
                                    if(typeof index !== 'undefined') {
                                        return (<SummaryCard index={index} data={orderSummary[index]} />);
                                    }
                                })}
                                <div className="summary-total">Total:  <span className="rupee">₹</span><span id="price">{this.getTotal()}</span>
                                    <div style={{fontSize: '14px', marginTop: '5px', marginLeft: '2px'}}>(incl GST + delivery charges)</div>
                                </div>
                                <div id="checkoutBtn" className="card-btn checkout" style={{bottom: '60px', marginTop: 'auto'}} onClick={()=>{document.getElementById('step1').classList.add('done');this.setState({showCoupon: true, activeStep: 0});}}>Next&nbsp;→
                                    <div className=""></div>
                                </div>
                              </div>}
                              {this.state.showCoupon &&
                                <div className="checkout-content">
                                    <div className="card-container small" style={{padding: '0px 12px 0px 12px'}}>
                                        <div className="section-one">
                                            <div className="top-right">
                                                <div className="usp-title" style={{left: '0',right: '0',margin: '0 auto'}}>
                                                    <span className="title-ff" style={{top:'7px'}}>Do you have a coupon code?</span>
                                                    <input id="dCoupon" type="text" className="step-input" placeholder="Enter coupon code" style={{marginTop: '10px'}}/>
                                                     <div id="applyCouponBtn" className="card-btn coupon-btn" style={{marginTop: '20px'}} onClick={()=>{this.applyCoupon()}}>Apply
                                                        <div className=""></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.couponApplied == true &&
                                        <div className="summary-total" style={{top: '496px'}}><span style={{opacity: '0.5'}}>Total:  </span><span className="rupee" style={{opacity: '0.5'}}>₹</span><span id="priceOriginal" style={{textDecoration: 'line-through', opacity: '0.5'}}>{this.getTotal()}</span>
                                        <span><img src="../../../img/images/ic_btick.png" style={{width: '32px', marginLeft: '20px'}}/><span style={{fontSize: '18px',marginLeft: '4px'}}>Coupon applied!</span></span>
                                        </div>
                                    }
                                    <div className="summary-total">Total:  <span className="rupee">₹</span><span id="price">{this.getTotal()}</span>
                                        <div style={{fontSize: '14px', marginTop: '5px', marginLeft: '2px'}}>(incl GST at 4%)</div>
                                    </div>
                                        <div id="checkoutBtnStep11" className="card-btn checkout" style={{top: '532px', marginTop: 'auto'}} onClick={()=>{document.getElementById('step2').classList.add('active');document.getElementById('step2Circle').classList.add('active');this.setState({showCoupon: false, activeStep: 2});}}>Next&nbsp;→
                                            <div className=""></div>
                                        </div>
                                </div>
                              }
                              {this.state.activeStep == 2 &&
                                <div className="checkout-content">

                                <div className="card-container" style={{padding: '0px 12px 0px 12px'}}>
                                            <div className="section-one">
                                                <div className="top">
                                                    <div className="top-right">
                                                        <div className="usp-title">
                                                            <input id="dPincode" type="text" className="step-input" placeholder="Your pincode"/>
                                                            <textarea id="dAddress" className="step-input" className="step-input step-textarea" placeholder="Delivery address (with landmark)" />
                                                            <input id="dMobile" type="text" className="step-input" placeholder="Mobile number" style={{top:'198px'}}/>
                                                            <input id="dName" type="text" className="step-input" placeholder="Your full name" style={{top:'238px'}}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                <div id="checkoutBtnStep2" className="card-btn checkout" style={{top: '532px', marginTop: 'auto'}} onClick={()=>{document.getElementById('step2').classList.add('done');this.captureAddress();}}>Next&nbsp;→
                                    <div className=""></div>
                                </div>
                              </div>}
                              {this.state.showSlot &&
                              <div className="checkout-content">
                                  <div className="card-container small" style={{padding: '0px 12px 0px 12px', minHeight: '246px'}}>
                                      <div className="section-one">
                                          <div className="top-right">
                                              <div className="usp-title" style={{left: '0',right: '0',margin: '0 auto'}}>
                                                  <span className="title-ff" style={{top:'-14px', padding: '20px', lineHeight: '22px'}}>When do you want your pizza delivered?</span>
                                                  <div className="slot">
                                                    <label for="slots">Available slots:</label>
                                                    <select name="slots" id="slots" onChange={()=>{this.selectSlot()}}>
                                                      <option value="Saturday, 1:30PM - 2.30PM">Saturday, 2:30PM - 3.30PM</option>
                                                      <option value="Saturday, 2:30PM - 3.30PM">Saturday, 2:30PM - 3.30PM</option>
                                                      <option value="Saturday, 3:30PM - 4.30PM">Saturday, 3:30PM - 4.30PM</option>
                                                      <option value="Saturday, 4:30PM - 5.30PM">Saturday, 4:30PM - 5.30PM</option>
                                                    </select>
                                                    <span className="title-ff">*Due to ongoing COVID-19 crisis, we're only able to deliver on weekends on non-curfew days.</span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                      <div id="checkoutBtnStep11" className="card-btn checkout" style={{top: '532px', marginTop: 'auto'}} onClick={()=>{document.getElementById('step2').classList.add('active');document.getElementById('step3Circle').classList.add('active');this.setState({showCoupon: false, showSlot: false, activeStep: 3});this.makePaymentRequest();}}>Next&nbsp;→
                                          <div className=""></div>
                                      </div>
                              </div>
                            }
                              {!this.state.showSlot && this.state.activeStep == 3 &&
                                  <div className="checkout-content">

                                  <div className="card-container" style={{padding: '0px 12px 0px 12px',minHeight: '200px'}}>
                                              <div className="section-one">
                                                  <div className="top">
                                                      <div className="top-right">
                                                          <div className="label-redirect">
                                                            Redirecting to payment partner... Please wait...
                                                          </div>
                                                          <div className="pizza">
                                                           {loaderElems}
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>


                                          </div>


                                </div>}
                        </div>


                                    {results && location.href.indexOf('/redirect/')==-1 && location.href.indexOf('/credits/')==-1 && results.map((resultItem, index) => {
                                        return (<Card index={index} data={resultItem} />);
                                    })}

                                    {location.href.indexOf('/redirect/')!=-1 && location.href.indexOf('&payment_status=Credit') !=-1 && <div className="card-container">
                                            <div className="status-title">
                                                <img src="../../../img/images/ic_tickw.png" className="status-img" />
                                                <span>Thanks for ordering your homely pizza!</span>
                                                <br/>
                                                <img className="ic-delivery" src="../../../img/images/ic_delivery.png" />
                                                <span className="small-title">Our delivery executive will get in touch with you as per your chosen delivery slot.</span>
                                             </div>

                                    </div>}

                                    {location.href.indexOf('/redirect/')!=-1 && location.href.indexOf('&payment_status=Credit') == -1 && <div className="card-container">
                                            <div className="status-title">
                                                <img src="../../../img/images/ic_error.png" className="status-img error" />
                                                <span>Your order is still pending</span>
                                                <br/><br/>
                                                <span className="small-title">Payment failed. Please retry by clicking the button below.</span>
                                                <br/>
                                                <div className="card-btn checkout small" onClick={()=>{location.href=localStorage.getItem('paymentLink');}}>Retry Payment
                                                                                    <div className=""></div>
                                                                                </div>
                                                <br/>
                                                <span className="small-title" style={{marginTop: '92px', fontSize: '16px'}}>If you continue to face issues, please call us at <a style={{color: '#ffd355'}} href="tel:+91-7619514999">+91-7619514999</a></span>
                                             </div>

                                    </div>}

                                    {location.href.indexOf('/credits/')!=-1 && <div className="card-container">
                                                                                <div className="status-title">

                                                                                    <span>Special Credits</span>
                                                                                    <br/>
                                                                                    <img className="ic-delivery" src="../../../img/images/medal.png" style={{marginLeft: '0px'}} />
                                                                                    <span className="small-title" style={{textAlign: 'justify'}}>We take pride in our team, especially our junior artists who strive to craft a memorable experience in their own creative ways.</span>

                                                                                 </div>
                                                                                 <div className="status-title" style={{marginTop: '140px'}}>

                                                                                     <span style={{fontSize: '20px',marginTop:'14px',fontWeight: 'bold'}}>Akshara, Creative logo & concept</span>
                                                                                     <div className="ic-delivery avataraks"  style={{marginLeft: '0px'}} />

                                                                                  </div>
                                                                                  <div className="status-title" style={{marginTop: '10px'}}>

                                                                                   <span style={{fontSize: '20px',marginTop:'14px',fontWeight: 'bold'}}>Antara, Visual design & logo art</span>
                                                                                   <div className="ic-delivery avatarant"  style={{marginLeft: '0px'}} />

                                                                                </div>
                                                                                <div className="status-title" style={{marginTop: '10px'}}>

                                                                                   <span style={{fontSize: '20px',marginTop:'14px',fontWeight: 'bold'}}>Srishti, Customer happiness</span>
                                                                                   <div className="ic-delivery avatarsr"  style={{marginLeft: '0px'}} />
                                                                                   <br/><br/><br/>

                                                                                </div>



                                                                        </div>}


                    </div><div className="credits"> © 2020 homely.pizza<span style={{marginLeft: '20px',textDecoration: 'underline'}} onClick={()=>{location.href='/credits/'}}>Special Credits</span></div>
                <br/>
                </div>)
    }
}

export default withRouter(Shortlists);