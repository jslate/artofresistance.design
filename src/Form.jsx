import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class Form extends React.Component {

  renderCheckboxes() {
    return this.props.categories.map((category) => {
      const checked = this.props.selectedCategories.indexOf(category) >= 0;
      return (
        <label style={{marginRight: '15px'}} key={category}>
          <input
            type="checkbox"
            name={category}
            checked={checked}
            style={{marginRight: '5px'}}
            onChange={this.props.onUpdateCategory} />{category}
        </label>);
    });
  }

  render() {
    return (<div className="well">{this.renderCheckboxes()}</div>);
  }

}

export default Form;
