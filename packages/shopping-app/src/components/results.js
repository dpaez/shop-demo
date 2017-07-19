import React from 'react';
import Breadcrumb from './breadcrumb';
import Cluster from './cluster';
import { get } from '../http';

class Results extends React.Component {

    constructor(props){
        super(props);
        this.state = props.initial || {};
    }

    componentDidMount() {
        if (this.state.items) return;
        const q = new URLSearchParams(this.props.location.search);
        this.fetchData(this.state.endpoints.search(q.get('search')));
    }

    fetchData(search) {
        get(search)
            .then(result => {
                this.setState({
                    categories: result.categories,
                    items: result.items
                })
            });
    }

    renderClusters(clusters = []){
        return clusters.map(item => <Cluster item={item} />);
    }

    render() {
        return (
            <div className='results w-80'>
                <Breadcrumb categories={this.state.categories}/>
                <section className='results__list'>
                {
                    this.renderClusters(this.state.items)
                }
                </section>
            </div>
        )
    }
}

export default Results;
