import React from 'react';
import Status from './status';

const NotFound = () => (
    <Status code={404}>
        <div className='error404'>
            <h1>Lo lamentamos, pero no hemos encontrado lo que buscabas.</h1>
        </div>
    </Status>
)

export default NotFound;

