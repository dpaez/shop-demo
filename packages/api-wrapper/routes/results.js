// native
// npm
const express = require('express');
const fetch = require('node-fetch');
// local
const config = require('../config');
const { parseResults, parseCategories } = require('../utils/parse');

const router = express.Router();

/* GET results */
router.get('/items', function(req, res, next) {
    // todo (dk): validate query params. Maybe try joi/celebrate
    fetch(config.lookup('/search')(req.query.q))
        .then(result => {
            req.log.info(`Search results api status: ${result.status}`);
            return result.json();
        })
        .then(parsed => {
            const out = {};
            // todo(dk): move me into a middleware
            out.author = {
                name: 'Diego',
                lastname: 'Paez'
            }

            out.categories = parseCategories(parsed.filters);
            out.items = parseResults(parsed.results);

            res.send(out)
        })
        .catch(err => {
            req.log.error(`Error when calling search results api: ${JSON.stringify(err)}`);
            res.json(err);
        });
});

module.exports = router;
