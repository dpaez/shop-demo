// native
// npm
const express = require('express');
const fetch = require('node-fetch');
// local
const config = require('../config');
const { parseDetails } = require('../utils/parse');

const router = express.Router();

/* GET details for a product */
router.get('/items/:id', function(req, res, next) {
    // todo (dk): validate query params. Maybe try joi/celebrate
    Promise.all([
        fetch(config.lookup('/items')(req.params.id)),
        fetch(config.lookup('/description')(req.params.id))
    ])
    .then(results => {
        return Promise.all([
            results[0].json(),
            results[1].json()
        ]);
    })
    .then(jsonArr => {
        const out = {};
        // todo(dk): move me into a middleware
        out.author = {
            name: 'Diego',
            lastname: 'Paez'
        }

        out.item = parseDetails(jsonArr[0]);
        const descObj = jsonArr[1];
        out.item.description = (descObj.snapshot) ? descObj.snapshot.url : '';
        res.send(out);
    })
    .catch(err => {
        req.log.error(`Error when calling details api: ${JSON.stringify(err)}`);
        err = err || {};
        if (!err.statusCode){
            err.statusCode = 404;
        }
        res.json(err);
    });
});

module.exports = router;
