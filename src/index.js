import join from 'lodash/join';
import moment from 'moment';
import './style.scss';

const _ = { join };

const getPeople = async () => {
  const response = await fetch('https://swapi.co/api/people');
  const result = await response.json();
  return result;
};

const avatar = ({ name, height, mass, created }) => `
  <div>
    <h3>${name}</h3>
    <ul>
        <li>Height: ${height}</li>
        <li>Mass: ${mass}</li>
        <li>created: ${moment(created).format('L')}</li>
    </ul>
  </div>
`;

const component = async () => {
  let element = document.createElement('div');

  const { results } = await getPeople();

  const html = results.map(obj => {
    return `
      <ul>
        ${avatar(obj)}
      </ul>
    `;
  });

  element.innerHTML = _.join(html, ' ');

  return element;
}

component()
.then(result => document.body.appendChild(result))
