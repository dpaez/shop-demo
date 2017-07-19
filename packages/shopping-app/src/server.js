import 'ignore-styles';
// native
import fs from 'fs';
import path from 'path';
// npm
import axios from 'axios';
import express from 'express';
import helmet from 'helmet';
import pino from 'express-pino-logger';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
// local
import App from './App';

const API_BASE = process.env.API_BASE || 'localhost:9290';

const endpointsGenerator = (base) => {
    return {
        search: (query) => `http://localhost:9290/api/items?q=${query}`,
        details: (id) => `http://localhost:9290/api/items/${id}`
    }
}

const endpoints = endpointsGenerator(API_BASE);

const app = express();
app.use(helmet());
app.use(pino());

app.use('/static', express.static(path.join(__dirname, '../build/static')));

// search
app.get('/', (req, res, next) => {

    const readTpl = new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname,'../build/index.html'), 'utf8', function(err, text){
            if (err) {
                reject(err);
            } else {
                resolve(text);
            }
        });
    })

    Promise.all([readTpl])
        .then(results => {
            let html = results[0];
            const context = {};
            const props = { endpoints };
            const out = renderToString(
                <StaticRouter location={req.originalUrl} context={context}>
                    <App />
                </StaticRouter>
            )
            html = html.replace('__TITLE', 'Shopping App Demo');
            html = html.replace('__META_TITLE', 'Shopping App Demo');
            html = html.replace('__META_DESC', 'Encontrá lo que buscas en Shopping App Demo');
            html = html.replace('__OUT', out);
            html = html.replace('window.__STATE', `window.__STATE = ${serialize(props)};`);
            res.send(html);
        })
})

// results
app.get('/items', (req, res, next) => {
    const fetchData = () => {
        return axios.get(endpoints.search(req.query.search))
    }

    const readTpl = new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname,'../build/index.html'), 'utf8', function(err, text){
            if (err) {
                reject(err);
            } else {
                resolve(text);
            }
        });
    })

    Promise.all([readTpl, fetchData()])
        .then(results => {
            let html = results[0];
            const context = {};
            const props = results[1].data;
            context.statusCode = results[1].statusCode;
            props.endpoints = endpoints;
            const out = renderToString(
                <StaticRouter location={req.originalUrl} context={context}>
                    <App {...props}/>
                </StaticRouter>
            )
            const title = props.items.length ? props.items[0].title : 'Shopping App Demo';
            html = html.replace('__TITLE', title);
            html = html.replace('__META_TITLE', 'Shopping App Demo');
            html = html.replace('__META_DESC', title);
            html = html.replace('__OUT', out);
            html = html.replace('window.__STATE', `window.__STATE = ${serialize(props)};`);
            res.status(context.statusCode || 200).send(html);
        })
        .catch(err => {
            req.log.error(err);
            next();
        })
})

// details
app.get('/items/:id', (req, res, next) => {
    const fetchData = () => {
        return axios.get(endpoints.details(req.params.id))
    }
    const readTpl = new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname,'../build/index.html'), 'utf8', function(err, text){
            if (err) {
                reject(err);
            } else {
                resolve(text);
            }
        });
    })
    Promise.all([readTpl, fetchData()])
        .then(results => {
            let html = results[0];
            const context = {};
            const props = results[1].data;
            context.statusCode = results[1].statusCode;
            props.endpoints = endpoints;
            const out = renderToString(
                <StaticRouter location={req.originalUrl} context={context}>
                    <App {...props} />
                </StaticRouter>
            )
            const title = (props.item && props.item.title) ? props.item.title : 'Shopping App Demo';
            html = html.replace('__TITLE', title);
            html = html.replace('__META_TITLE', 'Shopping App Demo');
            html = html.replace('__META_DESC', title);
            html = html.replace('__OUT', out);
            html = html.replace('window.__STATE', `window.__STATE = ${serialize(props)};`);
            res.status(context.statusCode || 200).send(html);
        })
        .catch(err => {
            req.log.error(err);
            res.status(500).end();
        })
})

const server = app.listen(process.env.PORT || 3001, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.info('Universal app listening at http://%s:%s', host, port);
});

