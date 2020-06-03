import {convertExponent} from "./helpers";

export const api = {
    getProducts: 'exchange-api/v1/public/asset-service/product/get-products',
    socket: 'wss://stream.binance.com/stream?streams=!miniTicker@arr'
}

export function getQuote({q}) {
    return q || '';
}

export function getBase({b}) {
    return b || '';
}

export function getParentMarket({pm}) {
    return pm || '';
}

export function getLastPrice({c}) {
    const parsedC = parseFloat(c);

    return isNaN(parsedC) ? NaN : convertExponent(parsedC)
}

export function getOpenPrice({o}) {
    const parsedO = parseFloat(o);

    return isNaN(parsedO) ? NaN : convertExponent(parsedO)
}

export function getVolume({qv}) {
    return qv || NaN
}

export function getChange(item) {
    const diff = getLastPrice(item) - getOpenPrice(item);

    return isNaN(diff) ? NaN : (diff / getOpenPrice(item) * 100).toFixed(2);
}

export function getPair(item) {
    return item.s || `${getBase(item)}${getQuote(item)}`;
}

export function getCanMargin() {
    return Math.random() >= 0.5 // random as can not understand how to compute it
}

export function normalizeItem(item) {
    return {
        base: getBase(item),
        quote: getQuote(item),
        lastPrice: getLastPrice(item),
        volume: getVolume(item),
        change: getChange(item),
        parentMarket: getParentMarket(item),
        canMargin: getCanMargin()
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
        const {lastPrice, change, canMargin} = normalizeItem(updateItem);
        const pair = getPair(updateItem);

        updated[pair] = {
            ...outdated[pair],
            lastPrice,
            change,
            canMargin
        }
    })

    return updated;
}