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
        <FacebookShareButton url="http://artofresistance.design">
          <FacebookIcon round={true} size={40}/>
        </FacebookShareButton>
        <TwitterShareButton url="http://artofresistance.design" title="Art of Resistance" hashtags={['ArtOfResistance']}>
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
      </div>
    );
  }
}

export default Sharing;
