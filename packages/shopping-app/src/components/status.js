import React from 'react';
import { Route } from 'react-router-dom';

const Status = ({ code, children }) => (
    <Route render={({ context }) => {
        if (context)
            context.status = code
        return children
    }}/>
)

export default Status;
