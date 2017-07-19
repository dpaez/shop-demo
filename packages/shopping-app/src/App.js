import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'url-search-params-polyfill';

import SearchBar from './components/searchbar';
import Results from './components/results';
import Details from './components/details';

import './App.css';

class App extends Component {

    render() {
        return (
            <main className='App'>
                <SearchBar />
                <Switch>
                    <Route exact path='/items' render={ props => <Results {...props} initial={this.props} />} />
                    <Route exact path='/items/:id' render={ props => <Details {...props} initial={this.props} />} />
                </Switch>
            </main>
        );
    }
}


export default App;
