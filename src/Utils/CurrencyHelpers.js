/**
 * @param {number} price
 * @param {boolean} [includeSign]
 */
export function formatPrice(price, includeSign = true) {
    const priceLabel = (price / 100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

    if (includeSign) {
        return `$ ${priceLabel}`;
    }

    return priceLabel;
}
