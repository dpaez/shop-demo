import React from 'react';
import Breadcrumb from './breadcrumb';
import NotFound from './not-found';
import { get } from '../http';
import { parsePrice, parseCondition, parseShipping } from '../utils/parsing';

class Details extends React.Component {

    constructor(props){
        super(props);
        this.state = props.initial || {};
    }

    componentDidMount () {
        if (this.state.item) return;
        this.fetchData(this.state.endpoints.details(this.props.match.params.id));
    }

    fetchData (search) {
        get(search)
            .then(result => {
                this.setState({
                    item: result.item,
                    categories: result.categories
                })
            });
    }

    renderProduct(data) {
        return (
            <div>
                <section className='details__product'>
                    <div className='details__headline fl w-70'>
                        <img width='680px' src={data.item.picture} alt={data.item.title}/>
                    </div>
                    <aside className='details__price w-30'>
                        <span className='details__price-condition'>{ parseCondition(data.item.condition)}</span>
                        <h2>{data.item.title}</h2>
                        <h1>{parsePrice(data.item.price)}</h1>
                        <a className='details__buy f4 link dim br2 ph3 pa3 mb2 dib w-100 tc' href='#'>Comprar</a>
                    </aside>
                </section>
                <section className='details__info cf'>
                    <h2> Descripción del Producto </h2>
                    <img src={data.item.description} alt='Descripción del producto' className='details__info-content' />
                </section>
            </div>
        )
    }

    renderNotFound(code) {
        return (
            code === 404 ? <NotFound /> : ''
        )
    }

    render() {
        return (
            <article className='details center w-80'>
                <Breadcrumb categories={ this.state.categories }/>
                { (this.state.item) ? this.renderProduct(this.state) : this.renderNotFound(this.state.statusCode) }
            </article>
        )
    }
}

export default Details;
