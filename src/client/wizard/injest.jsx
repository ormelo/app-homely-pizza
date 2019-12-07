import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";

window.addEventListener("resize", resizeCanvas, false);
        window.addEventListener("DOMContentLoaded", onLoad, false);

        window.requestAnimationFrame =
            window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function (callback) {
                window.setTimeout(callback, 1000/60);
            };

        var canvas, ctx, w, h, particles = [], probability = 0.04,
            xPoint, yPoint;





        function onLoad() {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            resizeCanvas();

            window.requestAnimationFrame(updateWorld);
        }

        function resizeCanvas() {
            if (!!canvas) {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            }
        }

        function updateWorld() {
            update();
            paint();
            window.requestAnimationFrame(updateWorld);
        }

        function update() {
            if (particles.length < 500 && Math.random() < probability) {
                createFirework();
            }
            var alive = [];
            for (var i=0; i<particles.length; i++) {
                if (particles[i].move()) {
                    alive.push(particles[i]);
                }
            }
            particles = alive;
        }

        function paint() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = "rgba(0,0,0,0.8)";
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'lighter';
            for (var i=0; i<particles.length; i++) {
                particles[i].draw(ctx);
            }
        }

        function createFirework() {
            xPoint = Math.random()*(w-200)+100;
            yPoint = Math.random()*(h-200)+100;
            var nFire = Math.random()*50+100;
            var c = "rgb("+(~~(Math.random()*200+55))+","
                 +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
            for (var i=0; i<nFire; i++) {
                var particle = new Particle();
                particle.color = c;
                var vy = Math.sqrt(25-particle.vx*particle.vx);
                if (Math.abs(particle.vy) > vy) {
                    particle.vy = particle.vy>0 ? vy: -vy;
                }
                particles.push(particle);
            }
        }

        function Particle() {
            this.w = this.h = Math.random()*4+1;

            this.x = xPoint-this.w/2;
            this.y = yPoint-this.h/2;

            this.vx = (Math.random()-0.5)*10;
            this.vy = (Math.random()-0.5)*10;

            this.alpha = Math.random()*.5+.5;

            this.color;
        }

        Particle.prototype = {
            gravity: 0.05,
            move: function () {
                this.x += this.vx;
                this.vy += this.gravity;
                this.y += this.vy;
                this.alpha -= 0.01;
                if (this.x <= -this.w || this.x >= screen.width ||
                    this.y >= screen.height ||
                    this.alpha <= 0) {
                        return false;
                }
                return true;
            },
            draw: function (c) {
                c.save();
                c.beginPath();

                c.translate(this.x+this.w/2, this.y+this.h/2);
                c.arc(0, 0, this.w, 0, Math.PI*2);
                c.fillStyle = this.color;
                c.globalAlpha = this.alpha;

                c.closePath();
                c.fill();
                c.restore();
            }
        }



const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

class Injest extends Component {

    constructor() {
        super();
        this.state = {
            value: 0,
            results: []
        };
        this.saveEvent = this.saveEvent.bind(this);
    }
    componentDidMount() {

       document.getElementById('link').value =  localStorage.getItem('link') != null ? localStorage.getItem('link') : '';
       document.getElementById('img').value = localStorage.getItem('img') != null ? localStorage.getItem('img') : '';
       document.getElementById('name').value = localStorage.getItem('name') != null ? localStorage.getItem('name') : '';
       document.getElementById('desc').value = localStorage.getItem('desc') != null ? localStorage.getItem('desc') : '';
       document.getElementById('price').value = localStorage.getItem('price') != null ? localStorage.getItem('price') : '';
       document.getElementById('remarks').value = localStorage.getItem('remarks') != null ?  localStorage.getItem('remarks') : '';
       setTimeout(function(){if(document.getElementById('logoHeading'))document.getElementById('logoHeading').style.opacity = '1';},50);
       setTimeout(function(){if(document.getElementById('iconArrow'))document.getElementById('iconArrow').style.opacity = '1';},500);
    }
    showAnim() {
        this.hideLoader();
        localStorage.removeItem("draft");
        document.getElementById('canvas').style.display='block';
        setTimeout("document.getElementById('newYearMsg').style.display='block'",1000);
        document.querySelector('.add-another').style.display = 'inline';
        document.querySelector('#id_submit').style.display = 'none';
    }
    showLoader() {
        document.getElementById('loaderBg').classList.add('loader-bg');
        document.getElementById('myTasksLoader').style.display = 'inline';
    }
    hideLoader() {
        document.getElementById('loaderBg').classList.remove('loader-bg');
        document.getElementById('myTasksLoader').style.display = 'none';
    }
    saveDraft() {
        if (localStorage.getItem('link').value != null) {
            localStorage.setItem('link', document.getElementById('link').value);
        }
        if (localStorage.getItem('img').value != null) {
            localStorage.setItem('img', document.getElementById('img').value);
        }
        if (localStorage.getItem('name').value != null) {
            localStorage.setItem('name', document.getElementById('name').value);
        }
        if (localStorage.getItem('desc').value != null) {
            localStorage.setItem('desc', document.getElementById('desc').value);
        }
        if (localStorage.getItem('price').value != null) {
            localStorage.setItem('price', document.getElementById('price').value);
        }
        if (localStorage.getItem('remarks').value != null) {
            localStorage.setItem('remarks', document.getElementById('remarks').value);
        }
    }
    saveEvent() {
        this.showLoader();
        window.scrollTo(0,0);
        //setTimeout(function(){this.showAnim();}.bind(this),3000);

        var payload = {};
        payload.link = escape(document.getElementById('link').value);
        payload.img = escape(document.getElementById('img').value);
        payload.name = document.getElementById('name').value;
        payload.nameId = document.getElementById('name').value.replace(/ /,'-');
        payload.desc = escape(document.getElementById('desc').value);
        payload.date = document.getElementById('date').value+' '+document.getElementById('time').value;
        payload.price = document.getElementById('price').value;
        payload.remarks = document.getElementById('remarks').value;

        axios.request({
                method: 'POST',
                url: '/saveEvent',
                responseType: 'json',
                data: payload
              }).then((response) => {console.log('response--',response);this.showAnim();})
                    .catch((error) => {console.log('Error response--',response);Promise.reject(error);});
    }
    render() {
        const {showLoader, results} = this.state;
        return (<div>
                    <div className="logo" id="logoWrapper" style={{top: '0px', marginLeft: '-10px'}}>
                        <img className="icon-back" src="../../../img/images/ic_back.png" onClick={()=>{history.back(-1);}} />
                        <Link to="/" style={{marginLeft: '34px'}}><img id="logo" className="logo-img" style={{width: '40px'}} src="../../../img/images/logo_ic.png" /></Link>
                        <div id="logoHeading" className="logo-heading" style={{marginLeft: '108px', marginTop: '-26px', textAlign: 'left', fontSize: '20px'}}>Save an event</div>
                    </div>
                    <canvas id="canvas"></canvas>
                    <div id="newYearMsg" className="new-year-msg">Thanks for making someone's new year special! <br/><br/><br/><span style={{fontSize:'24px'}}>Happy new year in advance!</span></div>
                    <div id="loaderBg"><i className="loading" id="myTasksLoader" style={{top: '28px'}}></i></div>
                    <div className="main fadeInBottom">
                        <hr className="line-tasks"/>
                        <img className="icon-tick" id="myTasksSuccess" src="../../../img/images/ic_tick.png"/>
                        <Paper style={{marginTop: '14px',padding:'0 20px'}}>
                                <form>
                                    <input onBlur={this.saveDraft} id="link" type="text" className="text-input" placeholder="Link"/>
                                    <input onBlur={this.saveDraft} id="img" type="text" className="text-input" placeholder="Image URL"/>
                                    <input onBlur={this.saveDraft} id="name" type="text" className="text-input" placeholder="Event Name"/>
                                    <textarea onBlur={this.saveDraft} id="desc" className="text-area" placeholder="Description"/>
                                    <input onBlur={this.saveDraft} id="price" type="text" className="text-input" placeholder="Price in INR"/>
                                    <input onBlur={this.saveDraft} id="remarks" type="text" className="text-input" placeholder="Remarks eg. Kid friendly, No alcohol served."/>
                                    <div className="datetimepicker">
                                        <input onBlur={this.saveDraft} className="text-input" type="date" id="date" style={{width: '130px'}}/>
                                        <span></span>
                                        <input onBlur={this.saveDraft} className="text-input" type="time" id="time" style={{width: '100px'}}/>
                                    </div>
                                </form>
                            </Paper>

                    </div>

                     <div class="panel-center mob-only" style={{position: 'relative',bottom: '0px',background: 'linear-gradient(rgba(216, 216, 216, 0.05) 0%, rgb(214, 214, 214) 100%)',left: '0px', zIndex: '9999'}}>


                            <div id="div_id_submit" className="form-group">
                                <div className="controls">

                                        <input type="submit" className="submit form-control" id="id_submit" value="Save" onClick={this.saveEvent}/>
                                        <input type="submit" className="submit form-control add-another" id="id_submit" value="Add another event" style={{display: 'none'}} onClick={()=>{location.reload()}}/>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="controls ">
                                    <p style={{color: '#000', fontSize: '9px', textAlign: 'center'}}></p>

                                </div>
                            </div>

                    </div>


                <br/>
                </div>)
    }
}

export default withRouter(Injest);