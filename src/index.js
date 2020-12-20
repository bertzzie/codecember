import * as P5 from './vendor/p5';
import Canvas from './canvas';

import './style/style.css';

const body = document.body;
const container = document.createElement('div');
container.setAttribute('id', 'container');

const options = Object.keys(Canvas).map(key => {
  const option = document.createElement('option');
  option.setAttribute('value', key);
  option.innerText = key;

  return option;
})

const defaultOption = document.createElement('option');
defaultOption.setAttribute('value', '0');
defaultOption.innerText = 'Select Day';

const select = document.createElement('select');
select.appendChild(defaultOption);
select.addEventListener('change', (e) => {
  const value = e.target.value;

  if (value === '0') {
    e.preventDefault();
    return ;
  }

  if (container.hasChildNodes()) {
    container.innerHTML = '';
  }


  new P5(Canvas[value], container);
})

options.forEach(option => select.appendChild(option));
body.appendChild(select);
body.appendChild(container);

