import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

class CaptureMeasurements extends Component {
    componentDidMount(){
      $('.content').fadeOut(0).fadeIn(300);
      $('.outline').hide();
      gtag('event', 'Stage', {'event_category':'load', 'event_label':'fit-profile-update'}); 
      gtag('config', 'UA-107877274-1',{'page_title': 'fit_profile_update','page_location': 'http://www.poseding.com/fit-profile-update','page_path': '/fit-profile-update'});
      Loggr.Log.trackUser(uid, "", "Navigated to fit-profile/update.");
      setTimeout("streamTrack.stop();",3000);
    }
    render(){
        return (<div className="content">
            <div style={{fontSize:'22px',textAlign:'center',lineHeight:'28px',paddingTop:'70px',color: '#4b4b4b',fontFamily:'a'}}>GREAT!</div>
            <div style={{fontSize:'18px',textAlign:'center',lineHeight:'28px',paddingTop:'12px',color: '#8e8c92',fontFamily:'Open Sans'}}>You have a wheatish tone & moderate build. Get ready to be surprised with looks tailored for you!</div>
            <img src="../img/success.png"  style={{margin:'0 auto',width:'200px',padding:'40px'}}/>
            <div className="btn-container" style={{bottom: '10px'}}>
            <Link to="/shop" className="btn" style={{margin:'0 auto',zIndex:1,marginTop:'24px',width: '286px'}}>
              <span>Let's shop</span>
            </Link>
            </div>
          </div>
          );
    }
}

export default CaptureMeasurements;