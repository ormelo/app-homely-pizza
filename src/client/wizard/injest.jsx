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
        setTimeout(function(){if(document.getElementById('logoHeading'))document.getElementById('logoHeading').style.opacity = '1';},50);
        setTimeout(function(){if(document.getElementById('iconArrow'))document.getElementById('iconArrow').style.opacity = '1';},500);
    }
    saveEvent() {
        alert(document.getElementById('name').value);
        alert(document.getElementById('desc').value);
        alert(document.getElementById('dateVal').value);
        alert(document.getElementById('price').value);
        alert(document.getElementById('remarks').value);
    }
    render() {
        const {showLoader, results} = this.state;
        return (<div>
                    <div className="logo" id="logoWrapper" style={{top: '0px', marginLeft: '-10px'}}>
                        <img className="icon-back" src="../../../img/images/ic_back.png" onClick={()=>{history.back(-1);}} />
                        <Link to="/" style={{marginLeft: '34px'}}><img id="logo" className="logo-img" style={{width: '40px'}} src="../../../img/images/logo_ic.png" /></Link>
                        <div id="logoHeading" className="logo-heading" style={{marginLeft: '108px', marginTop: '-26px', textAlign: 'left', fontSize: '20px'}}>Save an event</div>
                    </div>
                    <div><i className="loading" id="myTasksLoader" style={{top: '28px'}}></i></div>
                    <div className="main fadeInBottom">
                        <hr className="line-tasks"/>
                        <img className="icon-tick" id="myTasksSuccess" src="../../../img/images/ic_tick.png"/>
                        <Paper style={{marginTop: '14px',padding:'0 20px'}}>
                                <form>
                                    <input id="name" type="text" className="text-input" placeholder="Event Name"/>
                                    <textarea id="desc" className="text-area" placeholder="Add a description"/>
                                    <input id="dateVal" type="date" className="text-date" placeholder="Date"/>
                                    <input id="price" type="text" className="text-input" placeholder="Price in INR"/>
                                    <input id="remarks" type="text" className="text-input" placeholder="Add remarks eg. Kid friendly, No alcohol served etc"/>
                                </form>
                            </Paper>

                    </div>

                     <div class="panel-center mob-only" style={{position: 'fixed',bottom: '0px',background: 'linear-gradient(rgba(216, 216, 216, 0.05) 0%, rgb(214, 214, 214) 100%)',left: '0px', zIndex: '9999'}}>


                            <div id="div_id_submit" className="form-group">
                                <div className="controls">

                                        <input type="submit" className="submit form-control" id="id_submit" value="Save" onClick={this.saveEvent}/>

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