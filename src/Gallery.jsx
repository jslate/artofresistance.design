import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Masonry from 'react-masonry-component';

class Gallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showImages: false };
  }

  renderRows() {
    const style = this.state.showImages ? {} : {opacity: 0}
    return this.props.images.map((i) => {
      return (
        <div className="gallery-image">
          <img src={`/svgs/${i.filename}`} key={i.title} style={style} alt={i.title} />
        </div>
      );
    });
  }

  render() {
    return (
      <Masonry
        className='gallery'
        elementType='div'
        onImagesLoaded={() => this.setState({showImages: true})}
      >
        {this.renderRows()}
      </Masonry>
    );
  }
}

export default Gallery;
