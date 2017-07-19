import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import 'tachyons';
import './index.css';
import App from './App';

let props = {}
if (window.__STATE){
    props = window.__STATE;
}

ReactDOM.render((
    <BrowserRouter>
        <App {...props} />
    </BrowserRouter>),
    document.getElementById('root'));
