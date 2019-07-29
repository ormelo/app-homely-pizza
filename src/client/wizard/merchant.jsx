import React, { Component } from 'react';
import { render } from 'react-dom';

class Merchant extends Component {
    componentDidMount(){
      $('.content').fadeOut(0).fadeIn(300);
      $('.outline').hide();
      $('.merchant-frame').show();
      $('#currProduct').attr('src', '../'+sessionStorage.getItem('current-product').replace(/shop/g,''));
      $('#buyPrice').html('');
      Loggr.Log.trackUser(uid, "", "Buy page loaded");
      gtag('config', 'UA-107877274-1',{'page_title': 'buy','page_location': 'http://www.poseding.com/buy','page_path': '/buy'});
      gtag('event', 'Buy', {'event_category':'load', 'event_label':'buy-page-load', 'category': getCategory(), 'product': sessionStorage.getItem('current-product'), 'suggested-size': sessionStorage.getItem('current-product-size')});
      $.get("../"+getCategory()+".json", function(data, status){
          console.log(sessionStorage.getItem('current-product-index'));
          console.log(data[sessionStorage.getItem('current-product-index')].price);
          $('#buyPrice').html(data[sessionStorage.getItem('current-product-index')].price);
          $('#merchantSize').html("'"+sessionStorage.getItem('current-product-size')+"'");
      });
      $('#checkAvailability').click(function(){
        if($('#pincode').val() == '') {
          $('#pincode').focus();
          document.getElementById('pincode').focus();
          $('#pincode').css('border','2px solid #000');
          Loggr.Log.trackUser(uid, "", "Buy page: check availability clicked without pincode");
          gtag('event', 'Buy', {'event_category':'load', 'event_label':'pincode-need-to-enter','suggested-size': sessionStorage.getItem('current-product-size'),'selected-size': document.getElementById('sizes').options[document.getElementById('sizes').selectedIndex].innerHTML});
          gtag('event', 'Buy', {'event_category':'load', 'event_label': 'suggested-size '+sessionStorage.getItem('current-product-size')});
          gtag('event', 'Buy', {'event_category':'load', 'event_label': 'selected-size '+document.getElementById('sizes').options[document.getElementById('sizes').selectedIndex].innerHTML});
        } else {
          Loggr.Log.trackUser(uid, "", "Buy page: check availability clicked without pincode "+document.getElementById('pincode').value+" and size selected was "+document.getElementById('sizes').options[document.getElementById('sizes').selectedIndex].innerHTML+", size suggested was "+sessionStorage.getItem('current-product-size'));
          gtag('event', 'Buy', {'event_category':'load', 'event_label':'pincode-entered', 'suggested-size': sessionStorage.getItem('current-product-size'),'selected-size': document.getElementById('sizes').options[document.getElementById('sizes').selectedIndex].innerHTML});
          gtag('config', 'UA-107877274-1',{'pincode': 'buy','page_location': 'http://www.poseding.com/pincode','page_path': '/pincode'});
          gtag('event', 'Buy', {'event_category':'load', 'event_label': 'suggested-size-'+sessionStorage.getItem('current-product-size')});
          gtag('event', 'Buy', {'event_category':'load', 'event_label': 'selected-size-'+document.getElementById('sizes').options[document.getElementById('sizes').selectedIndex].innerHTML});
          gtag('event', 'Buy', {'event_category':'load', 'event_label': 'pincode-typed-'+document.getElementById('pincode').value});
          alert('Sorry, we are working on enabling shipping in your area. We will notify you soon.');
        }
      });
    }
    render(){
        return (<div className="content buy" style={{display:'block',height:'auto'}}>
            <div style={{fontSize:'22px',textAlign:'center',lineHeight:'28px',paddingTop:'16px',marginTop:'50px'}}><img style={{width:'120px'}} src="../img/merch_logo.png"/> 
            </div>
            <hr style={{marginTop: '10px', marginBottom: '14px'}}/>
            <div style={{width: '250px', margin: '0 auto', left: '0',right: '0'}}>
            <span className="rating"><b style={{width: '3.6em'}}><i>Rating: 4.2 out of 5</i></b></span><span style={{fontSize: '12px'}}>(22)</span>
            <div className="description" style={{paddingBottom:'0px',marginTop:'0px',display:'inline',marginLeft: '12px',fontSize: '16px'}}>
                Size:&nbsp;&nbsp; <select id="sizes" style={{marginTop:'5px',height:'40px',fontSize:'18px'}}>
                    <option id="s1" value="m">M</option>
                    <option id="s2" value="l">L</option>
                    <option id="s3" value="xl">XL</option>
                    <option id="s4" value="xxl">XXL</option>
                </select>
            </div>
            </div>
            <div style={{margin: '0 auto',left:'0',right:'0',fontSize:'16px',color:'#ff9800'}}>
            ₹<span id="buyPrice" style={{fontWeight:'bold'}}></span>
            </div>
            <br/>
            <div><img id="currProduct" style={{width:'100px'}} src=""/></div>
            <input type="text" id="pincode" placeholder="Enter Pincode for shipping" style={{width:'280px',height:'40px',padding:'10px',fontSize:'16px',marginTop:'12px',border:'1px solid #d2d2d2'}}/>
            <div className="btn-check" id="checkAvailability"><span>Check Availability</span></div>
          </div>
          );
    }
}

export default Merchant;