import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './styles.css';

ReactDOM.render(
    <CalendarApp />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register(); // Si no sale en la pestana de Application del NAvegador toca cambiarlo a Register