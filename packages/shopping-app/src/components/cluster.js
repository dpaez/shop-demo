import React from 'react';
import { Link } from 'react-router-dom';
import { parsePrice, parseCondition, parseShipping } from '../utils/parsing';


const Cluster = ({ item }) => (
    <div className='cluster w-100'>
        <div className='cluster__img fl'>
            <img width='180' height='180' src={item.picture} alt={item.title} />
        </div>
        <div className='cluster__description fl w-60'>
            <span className='cluster__price'>{ parsePrice(item.price) }</span>
            <Link to={`/items/${item.id}`} className='cluster__title'>{item.title}</Link>
        </div>
        <div className='cluster__cond fl'>
            <span>{ parseCondition(item.condition) }</span>
            <span>{ parseShipping(item.shipping) }</span>
        </div>
    </div>
)

export default Cluster;
