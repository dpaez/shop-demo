// api endpoints config file

module.exports = {
    '$filter': 'env',
    'production': {
        'search': query => `https://api.mercadolibre.com/sites/MLA/search?q=${query}`,
        'items': id => `https://api.mercadolibre.com/items/${id}`,
        'description': id => `https://api.mercadolibre.com/items/${id}/description`
    },
    '$default': {
        'search': query => `https://api.mercadolibre.com/sites/MLA/search?q=${query}`,
        'items': id => `https://api.mercadolibre.com/items/${id}`,
        'description': id => `https://api.mercadolibre.com/items/${id}/description`
    }
};
