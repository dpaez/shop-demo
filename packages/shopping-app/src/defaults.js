const mock ={"author":{"name":"Diego","lastname":"Paez"},"categories":["Celulares y Teléfonos","Celulares y Smartphones","iPhone"],"items":[{"id":"MLA632591345","title":"Iphone 6 16gb Lte 4g Libres Nuevos Caja Sellados","price":{"currency":"ARS","amount":9690,"decimals":0},"picture":"http://mla-s1-p.mlstatic.com/532505-MLA25018939647_082016-I.jpg","condition":"new","free_shipping":true},{"id":"MLA626101408","title":"Iphone 5s 16gb Retina 4g Touch Id Caja Sellada Libres Gtia","price":{"currency":"ARS","amount":7499,"decimals":0},"picture":"http://mla-s2-p.mlstatic.com/468421-MLA20796482930_072016-I.jpg","condition":"new","free_shipping":true},{"id":"MLA621827059","title":"Iphone 7 Apple 128gb Retina Sellado + Original Garantia !!!","price":{"currency":"ARS","amount":20899,"decimals":99},"picture":"http://mla-s1-p.mlstatic.com/593705-MLA25069579521_092016-I.jpg","condition":"new","free_shipping":true},{"id":"MLA664565056","title":"Iphone 6 4g Lte 16gb - Original - Todos Los Colores","price":{"currency":"ARS","amount":8999,"decimals":0},"picture":"http://mla-s2-p.mlstatic.com/746611-MLA25561706571_052017-I.jpg","condition":"new","free_shipping":true}]}

const mockDetail = {"author":{"name":"Diego","lastname":"Paez"},"item":{"id":"MLA626101408","title":"Iphone 5s 16gb Retina 4g Touch Id Caja Sellada Libres Gtia","price":{"currency":"ARS","amount":7499,"decimals":0},"picture":"http://mla-s2-p.mlstatic.com/468421-MLA20796482930_072016-O.jpg","condition":"new","free_shipping":true,"sold_quantity":127,"description":"<p><img src=\"http://i.imgur.com/ju962cn.jpg\" width=\"922\" height=\"5098\" /></p>"}}

const endpoints = {
    search: () => '',
    details: () => ''
}

const location = 'http://localhost:3000/items?search=batman'


const DefaultProps = {
    get: (query) => {
        return Promise.resolve(mock);
    },
    endpoints,
    location,
    results: mock,
    details: mockDetail
}

export default DefaultProps;
