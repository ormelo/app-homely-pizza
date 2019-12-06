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
    }
    componentDidMount() {
        setTimeout(function(){if(document.getElementById('logoHeading'))document.getElementById('logoHeading').style.opacity = '1';},50);
        setTimeout(function(){if(document.getElementById('iconArrow'))document.getElementById('iconArrow').style.opacity = '1';},500);
    }



    render() {
        const {showLoader, results} = this.state;
        return (<div>
                    <div className="logo" id="logoWrapper" style={{top: '0px', marginLeft: '-10px'}}>
                        <img className="icon-back" src="../../../img/images/ic_back.png" onClick={()=>{history.back(-1);}} />
                        <Link to="/" style={{marginLeft: '34px'}}><img id="logo" className="logo-img" style={{width: '40px'}} src="../../../img/images/logo_ic.png" /></Link>
                        <div id="logoHeading" className="logo-heading" style={{marginLeft: '108px', marginTop: '-26px', textAlign: 'left', fontSize: '18px'}}>Save an event</div>
                    </div>
                    <div><i className="loading" id="myTasksLoader" style={{top: '28px'}}></i></div>
                    <div className="main fadeInBottom">
                        <hr className="line-tasks"/>
                        <img className="icon-tick" id="myTasksSuccess" src="../../../img/images/ic_tick.png"/>
                        <Paper style={{marginTop: '14px',padding:'0 20px'}}>
                                <form>
                                    <input type="text" width="250px" placeholder="Event Name"/>
                                </form>
                            </Paper>

                    </div>
                <br/>
                </div>)
    }
}

export default withRouter(Injest);