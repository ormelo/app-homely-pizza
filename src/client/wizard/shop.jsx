import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Shop extends Component {
    propTypes: {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    }
    componentDidMount(){
      $('.content').fadeOut(0).fadeIn(300);
      $('.logo').css('visibility','visible');
      $('.logo').css('top','18px');
      $('.merchant-frame').hide();
      gtag('event', 'Stage', {'event_category':'load', 'event_label':'shop'}); 
      gtag('config', 'UA-107877274-1',{'page_title': 'shop','page_location': 'http://www.poseding.com/shop','page_path': '/shop'});
      Loggr.Log.trackUser(uid, "", "Navigated to /shop.");
      //temp: commented
      /* setTimeout("$('.splashImg').hide();$('#d1').fadeOut(0).fadeIn(500);",0);
      setTimeout("$('.splashImg').hide();$('#d2').fadeOut(0).fadeIn(500);",1000);
      setTimeout("$('.splashImg').hide();$('#d3').fadeOut(0).fadeIn(500);",2000);
      setTimeout("$('.splashImg').hide();$('#d4').fadeOut(0).fadeIn(500);",3000);
      setTimeout("$('#d4').fadeOut(100);$('#splash').hide();$('#tabs').fadeOut(0).fadeIn(500);",4000); */
      //temp: uncomment above and remove below line
      $('#splash').hide();$('#tabs').fadeOut(0).fadeIn(500);
      console.log('start showProducts()');
      showProducts('tops');
      if(document.body.clientWidth > 700) {
        $('.products').css('left',document.body.clientWidth/40);
      }
      $('.outline').hide();

      //click handler for tabs
      $(".tabs-menu a").click(function(event) {
          event.preventDefault();
          $(this).parent().addClass("current");
          $(this).parent().siblings().removeClass("current");
          var tab = $(this).attr("href");
          $(".tab-content").not(tab).css("display", "none");
          $(tab).fadeIn();
      });

      var h = this.props.history;
      window.onBuy = function(url) {
        h.push('/shop/buy');
      }
    }
    render(){
        return (<div className="contentShop" style={{minHeight:minHeightVal,width:'100%'}}>
          
          <div className="products">
            <div className="product" id="product">
            </div>
          </div>

        <div className="logo" style={{boxShadow:'none',position:'fixed',top:'20px',background:'#fff'}}><img src="../img/logoimg.png" style={{width: '16px', left: '20px', position: 'absolute', top:'0px'}}/><span className="logoFont" style={{top:'-2px'}}>a</span><img className="bag" src="../img/bag.jpg" width="20px" style={{top:'-4px'}}/></div>
        <div id="tabs" style={{display:'none',position: 'fixed',width:'100%',top:'0px',left:'0px',height:'70px',textAlign:'center',padding:'22px'}}>


<div id="tabs-container">
    <ul className="tabs-menu">
        <li><a id="tab1" href="#tab-1">Your Personal Lookbook</a></li>
    </ul>
    <div className="tab">
        <div id="tab-1" className="tab-content">
           
        </div>
        <div id="tab-2" className="tab-content">
           
        
        </div>
        <div id="tab-3" className="tab-content">
            
        </div>
        <div id="tab-4" className="tab-content">
           
        </div>
    </div>
</div>

<div className="loading-container"><div className="loading"></div></div>


        </div>

          <div id="splash" style={{margin:'0 auto',marginTop:'18vh'}}>
             <div className="btnMsg" style={{margin:'0 auto',background:'rgba(234, 225, 244, 0.35)',top:'15vh'}}>
              <span>Finding best looks for you…</span>
            </div>
            </div>
          <br/>


          <div id="footerSlideContainer">
          <div className="close"></div>
          <img className="size-hanger" src="../img/hanger.png"></img>
          <div className="size-title blink">Trying size M</div>
            <div id="footerSlideContent">
              <div id="footerSlideText">
                <section className="variable slider">
                <div id="size1" className="size-slide">
                </div>
                <div id="size2" className="size-slide">
                </div>
                <div id="size3" className="size-slide">
                </div>
                <div id="size4" className="size-slide">
                </div>
              </section>
              </div>
            </div>
          </div>

          <div className="fit-shoulder-left"></div>
          <div className="fit-shoulder-right"></div>
          <div className="fit-waist-left"></div>
          <div className="fit-waist-right"></div>

          <div className="button-container">
                  <a className="btn" id="buy-now" style={{position:"fixed",bottom:"20px",margin: "0 auto",display:"none"}}><span>Buy Now</span></a>
                </div>
            
          </div>
          );
    }
}

export default Shop;