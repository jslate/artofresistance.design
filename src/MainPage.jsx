import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import Masonry from 'react-masonry-component';
import imageData from './ImageData.js'
import Form from './Form.jsx'
import Sharing from './Sharing.jsx'
import Gallery from './Gallery.jsx'

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { page: 'home', selectedCategories: [] };
    this.getNavClass = this.getNavClass.bind(this);
    this.renderPageContents = this.renderPageContents.bind(this);
    this.navTo = this.navTo.bind(this);
    this.onUpdateCategory = this.onUpdateCategory.bind(this);
    this.getImagesForSelectedCategories = this.getImagesForSelectedCategories.bind(this);
  }

  getNavClass() {
    return this.state.navOpen ? 'navbar-collapse' : 'navbar-collapse collapse';
  }

  getImagesForSelectedCategories() {
    if (this.state.selectedCategories.length == 0) { return imageData; }
    return _.filter(imageData, (image) => {
      return _.intersection(image.categories, this.state.selectedCategories).length > 0
    });
  }

  onUpdateCategory(event) {
    if (event.target.checked) {
      this.setState({selectedCategories: _.uniq(_.union(this.state.selectedCategories, [event.target.name]))});
    } else {
      this.setState({selectedCategories: _.pull(this.state.selectedCategories, event.target.name)});
    }
  }

  getCategories() {
    return _.uniq(_.flatten(imageData.map((i) => i.categories)));
  }

  navTo(event, location) {
    event.preventDefault();
    this.setState({navOpen: false, page: location});
  }

  renderHome() {
    return (
      <div>
        <Form
          categories={this.getCategories()}
          selectedCategories={this.state.selectedCategories}
          onUpdateCategory={this.onUpdateCategory}
        />
        <Gallery images={this.getImagesForSelectedCategories()} />
      </div>);
  }

  renderAbout() {
    return (
      <div className="well">
        <h1>Open license artwork to power the #Resistance!</h1>

        <p>All the artwork on this site is under the <a href="https://opensource.org/licenses/MIT">MIT License</a> which means
        you are free to do whatever you want with it. We hope you will use it to stand up for progressive values!</p>

        <p>Author: Jonathan Slate (<a href="https://twitter.com/jslate">@jslate</a>)</p>
      </div>
    );
  }

  renderPageContents() {
    if (this.state.page == 'home') {
      return this.renderHome();
    } else if (this.state.page == 'about') {
      return this.renderAbout();
    }
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
          <Sharing />
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
