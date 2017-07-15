// native
const assert = require('assert');
// npm
// local

/**
 * Parse the input according this:
 * items: [
 *   {
 *     "id": String,
 *     "title": String,
 *     "price": {
 *       "currency": String,
 *       "amount": Number,
 *       "decimals": Number
 *     },
 *     "picture": String,
 *     "condition": String,
 *     "free_shipping": Boolean
 *   },
 *   {...},
 * ]
 *
 * @params {Array} API response results
 * @returns {Array} Parsed output
 */
exports.parseResults = (results) => {
    assert.ok(Array.isArray(results), 'Bad input: parseResults expects an array');
    // only return first four (4) values according to spec
    return results
        .slice(0,4)
        .map(item => {
            const price = item.price.toString().split('.');
            const amount = price[0] ? Number(price[0]) : 0;
            const decimals  = price[1] ? Number(price[1]) : 0;
            return {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount,
                    decimals
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: (item.shipping) ? item.shipping.free_shipping : false
            }
        });
};

exports.parseCategories = (filters) => {
    assert.ok(Array.isArray(filters), 'Bad input: parseCategories expects an array');
    return filters
        .filter(cat => cat.id === 'category')
        .reduce((arr, item) => {
            return arr.concat(
                item.values.reduce((acc, val) => {
                    return acc.concat(
                        val.path_from_root.reduce((names, deepVal) => {
                            return names.concat(deepVal.name);
                        }, [])
                    );
                }, [])
            );
        },[]);
};

exports.parseDetails = (item) => {
    assert.ok(typeof item === 'object', 'Bad input: parseDetails expects an object');
    const price = item.price.toString().split('.');
    const amount = price[0] ? Number(price[0]) : 0;
    const decimals  = price[1] ? Number(price[1]) : 0;
    const picture = (item.pictures && item.pictures.length) ?
        item.pictures[0].url :
        item.thumbnail;
    return {
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            amount,
            decimals
        },
        picture,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity
    };
};
