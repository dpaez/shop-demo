import React from 'react';
import BreadcrumbItem from './breadcrumb-item';

const Breadcrumb = ({categories=[]}) => (
    <ul className='breadcrumb'>
        {
            categories.map(category => <BreadcrumbItem category={category} />)
        }
    </ul>
)

export default Breadcrumb;
