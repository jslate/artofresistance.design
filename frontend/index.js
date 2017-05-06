import MainPage from './MainPage.jsx'
import Sharing from './Sharing.jsx'
require('./style.scss');

document.getElementsByClassName('navbar-toggle')[0].onclick = () => {
  const classList = document.getElementById('navbar').classList;
  if (classList.contains('collapse')) { classList.remove('collapse'); }
  else { classList.add('collapse'); }
};


window.downloadSupported = typeof(document.createElement('a').download) != "undefined";

if (downloadSupported) {
  var e = document.getElementsByClassName('right-click')[0];
  if (e) { e.parentElement.removeChild(e); }
}
