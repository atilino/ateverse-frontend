import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import "antd/dist/antd.css";
import { BrowserRouter } from 'react-router-dom';
import { PrivateInterceptor, ResponseInterceptor } from './middleware';

PrivateInterceptor()
ResponseInterceptor()

ReactDOM.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>,
    document.getElementById('root')
);

module.hot.accept();
