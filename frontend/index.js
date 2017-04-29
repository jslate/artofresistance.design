import MainPage from './MainPage.jsx'
require('./style.scss');

document.getElementsByClassName('navbar-toggle')[0].onclick = () => {
  const classList = document.getElementById('navbar').classList;
  if (classList.contains('collapse')) { classList.remove('collapse'); }
  else { classList.add('collapse'); }
};
