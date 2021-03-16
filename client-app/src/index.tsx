import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';
import './app/layout/styles.css';
=======
import { Router } from 'react-router-dom';
import './app/layout/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {createBrowserHistory} from 'history';
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './app/layout/ScrollToTop';

<<<<<<< HEAD
ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>,
=======
export const history = createBrowserHistory();

ReactDOM.render(
  
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
    </Router>,
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
