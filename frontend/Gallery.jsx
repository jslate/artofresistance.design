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
        <div className="gallery-image" onClick={() => document.location = `${i.key}.html`}>
          <img src={`/svgs/${i.filename}`} key={i.key} style={style} alt={i.title} />
        </div>
      );
    });
  }

  render() {
    return (
      <Masonry
        className='gallery'
        elementType='div'
        onLayoutComplete={_.debounce(() => this.setState({showImages: true}), 1000)}
      >
        {this.renderRows()}
      </Masonry>
    );
  }
}

export default Gallery;
