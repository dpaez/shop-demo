import React from 'react';
import { Link } from 'react-router-dom'

const BreadcrumbItem = ({category}) => (
    <li>
        <Link to={`/items?search=${category}`} >{ category }</Link>
        <span className="separator"> > </span>
    </li>
)

export default BreadcrumbItem;
