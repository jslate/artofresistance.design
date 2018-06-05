import React from 'react';
import ReactDOM from 'react-dom';

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

class Sharing extends React.Component {
  render() {
    return (
      <div className="sharing">
        <div style={{display: 'inline-block', verticalAlign: 'top', marginRight: '15px'}}><strong>Share on:</strong></div>
        <FacebookShareButton url={this.props.url}>
          <FacebookIcon round={true} size={40}/>
        </FacebookShareButton>
        <TwitterShareButton url={this.props.url} title={this.props.title} hashtags={['Art']}>
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
      </div>
    );
  }
}

const componentElement = document.getElementById('sharing');
if (componentElement) {
  ReactDOM.render(
    <Sharing url={componentElement.dataset['url']} title={componentElement.dataset['title']} />,
    componentElement
  );
}
