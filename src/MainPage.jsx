import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import imageData from './ImageData.js'

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {page: 'home'};
    this.getNavClass = this.getNavClass.bind(this);
    this.renderPageContents = this.renderPageContents.bind(this);
    this.renderSharing = this.renderSharing.bind(this);
    this.navTo = this.navTo.bind(this);
  }

  getNavClass() {
    if (this.state.navOpen) {
      return 'navbar-collapse';
    } else {
      return 'navbar-collapse collapse';
    }
  }

  renderAbout() {
    return (<div className="well">
        <p>Open license artwork to power the #Resistance!</p>

        <p>Author: Jonathan Slate (<a href="https://twitter.com/jslate">@jslate</a>)</p>
      </div>);
  }

  renderRows() {
    return imageData.map((i) => {
      return (
        <div key={i.title} className="col-md-3 col-sm-6" style={{marginBottom: '50px'}}>
          <img src={`/svgs/${i.filename}`} alt={i.title} className="img-responsive img-thumbnail" />
        </div>
      );
    });
  }
  //style={{maxWidth: '200px', maxHeight: '200px'}} />

  renderHome() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            {this.renderRows()}
          </div>
        </div>

      </div>);
  }

  renderPageContents() {
    if (this.state.page == 'home') {
      return this.renderHome();
    } else if (this.state.page == 'about') {
      return this.renderAbout();
    }
  }

  renderSharing() {
    return (
      <div className="sharing">
        <div style={{display: 'inline-block', verticalAlign: 'top', marginRight: '15px'}}><strong>Share on:</strong></div>
        <FacebookShareButton url="http://artofresistance.org">
          <FacebookIcon round={true} size={40}/>
        </FacebookShareButton>
        <TwitterShareButton url="http://artofresistance.org" title="Art of Resistance" hashtags={['ArtOfResistance']}>
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
      </div>
    );
  }

  navTo(event, location) {
    event.preventDefault();
    this.setState({navOpen: false, page: location});
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
                onClick={() => this.setState({navOpen: !this.state.navOpen})}>
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#" onClick={(event) => this.navTo(event, 'home')}>Art of Resistance</a>
            </div>
            <div id="navbar" className={this.getNavClass()}>
              <ul className="nav navbar-nav">
                <li className={this.state.page == 'home' ? 'active' : ''}><a href="#" onClick={(event) => this.navTo(event, 'home')}>Home</a></li>
                <li className={this.state.page == 'about' ? 'active' : ''}><a href="#" onClick={(event) => this.navTo(event, 'about')}>About</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.renderPageContents()}
          {this.renderSharing()}
        </div>
      </div>);
  }
}

const componentElement = document.getElementById('outer-container');
if (componentElement) {
  ReactDOM.render(
    <MainPage />,
    componentElement
  );
}
