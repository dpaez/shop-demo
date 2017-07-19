import React from 'react';

const SearchBar = () => (
    <header role='banner'>
        <div className='header-wrapper w-80'>
            <a href='/' className='logo' >
                <img src='https://http2.mlstatic.com/ui/navigation/2.0.8/mercadolibre/logo__large@2x.png' className='logo__img' alt='Mercado Libre Argentina - Donde comprar y vender de todo'/>
            </a>
            <form method='get' action='/items' className='searchbar'>
                <input tabIndex='1' name='search' autocomplete='off' type='text' maxLength='120' />
                <button type='submit'>
                    <span role='img' aria-label='Buscar'>🔎</span>
                </button>
            </form>
        </div>
    </header>
)

export default SearchBar;
