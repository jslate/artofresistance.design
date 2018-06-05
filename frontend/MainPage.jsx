import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import Masonry from 'react-masonry-component';
// import imageData from './ImageData.js'
import Form from './Form.jsx'
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

  render() {
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
}

const componentElement = document.getElementById('outer-container');
if (componentElement) {
  ReactDOM.render(
    <MainPage />,
    componentElement
  );
}
