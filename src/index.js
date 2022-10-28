import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes/Router';
import "antd/dist/antd.css";


ReactDOM.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
    document.getElementById('root')
);

module.hot.accept();
