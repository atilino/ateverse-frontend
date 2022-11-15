import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import "antd/dist/antd.css";
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

module.hot.accept();
