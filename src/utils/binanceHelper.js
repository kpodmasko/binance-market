export const api = {
    getProducts: '/exchange-api/v1/public/asset-service/product/get-products',
    socket: 'wss://stream.binance.com/stream?streams=!miniTicker@arr'
}

export function getQuote({q}) {
    return q || '';
}

export function getBase({b}) {
    return b || '';
}

export function getLastPrice({c}) {
    return c || NaN;
}

export function getOpenPrice({o}) {
    return o || NaN;
}

export function getVolume({qv}) {
    return qv ? qv.toFixed(2) : NaN
}

export function getChange(item) {
    const change = getLastPrice(item) - getOpenPrice(item);

    return isNaN(change) ? NaN : change.toFixed(10);
}

export function getPair(item) {
    return item.s || `${getBase(item)}${getQuote(item)}`;
}

export function normalizeItem(item) {
    return {
        base: getBase(item),
        quote: getQuote(item),
        lastPrice: getLastPrice(item),
        volume: getVolume(item),
        change: getChange(item)
    };
}

export function normalizeData(raw) {
    if (!raw) {
        return raw;
    }

    return raw.reduce((normalized, rawItem) => {
        normalized[getPair(rawItem)] = normalizeItem(rawItem);

        return normalized;
    }, {})
}

export function updateData(outdated, updates) {
    if (!outdated || !updates) {
        return outdated;
    }

    const updated = {...outdated};

    updates.forEach(updateItem => {
        const {lastPrice, change} = normalizeItem(updateItem);
        const pair = getPair(updateItem);

        updated[pair] = {
            ...outdated[pair],
            lastPrice,
            change
        }
    })

    return updated;
}