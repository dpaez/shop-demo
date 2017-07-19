export function parsePrice (priceObj) {
    const currency = (priceObj.currency === 'ARS') ? '$' : priceObj.currency;
    return `${currency} ${priceObj.amount}${priceObj.decimals ? `.${priceObj.decimals}` : '' }`;
}

export function parseCondition (condition) {
    return (condition === 'new') ? 'Nuevo' : condition;
}
export function parseShipping (shipping) {
    return (!shipping) ? 'Envio gratis' : '';
}
