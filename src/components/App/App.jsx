import React, {
    useCallback, useEffect, useState, useRef, useMemo
} from 'react';
import {
    faStar, faPause, faPlay, faCloudDownloadAlt, faTimes
} from '@fortawesome/free-solid-svg-icons'

import Header from '../Header';
import Category from "../Category";
import Icon from "../Icon";
import Search from "../Search";
import Radio from "../Radio";
import Table from "../Table";
import {sort, testIds} from "../../utils/constants";
import {
    api, normalizeData, updateData
} from "../../utils/binanceHelper";

import './App.css';

function generateSorter({sortBy, sortDirection}) {
    function sortDataItem(a, b) {
        if (a > b) {
            return sortDirection === sort.ASC ? 1 : -1;
        }
        if (a < b) {
            return sortDirection === sort.ASC ? -1 : 1;
        }
        return 0;
    }

    return function (a, b) {
        const dataForSortType = typeof a[sortBy];

        if (dataForSortType !== 'object') {
            return sortDataItem(a[sortBy], b[sortBy]);
        } else {
            return sortDataItem(a[sortBy].root, b[sortBy].root);
        }
    }
}

const radioData = [{
    label: 'Change',
    value: 'change'
}, {
    label: 'Volume',
    value: 'volume'
}]

const currencyData = [
    {label: <Icon icon={faStar}/>, value: 'stars'},
    {label: 'Margin', value: 'margin'},
    {label: 'BNB', value: 'BNB'},
    {label: 'BTC', value: 'BTC'},
    [
        {label: 'ALTS', value: 'ALTS'},
        {label: 'XRP', value: 'XRP'},
        {label: 'ETH', value: 'ETH'},
        {label: 'TRX', value: 'TRX'}
    ],
    [
        {label: 'USDⓈ', value: 'USDⓈ'},
        {label: 'USDT', value: 'USDT'},
        {label: 'BUSD', value: 'BUSD'},
        {label: 'TUSD', value: 'TUSD'},
        {label: 'PAX', value: 'PAX'}
    ]
];

// TODO: replace categories to constants
// TODO: styling
// TODO: add custom hooks for localStorage, sockets
// TODO: tests for components

function App() {
    const [sortDirection, setSortDirection] = useState('ASC');
    const [sortBy, setSortBy] = useState('name');
    const [data, setData] = useState(null);
    const [isUpdating, setIsUpdating] = useState(true);
    const [isAlive, setIsAlive] = useState(true);
    const [stars, setStars] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [rateType, setRateType] = useState(radioData[0].value);

    const socketRef = useRef(null);

    const handleUpdatingTogglerClick = useCallback(() => {
        if (isAlive) {
            setIsUpdating(!isUpdating);
            return;
        }

        setIsUpdating(false);
    }, [setIsUpdating, isUpdating, isAlive]);

    const handleAliveTogglerClick = useCallback(() => {
        setIsAlive(!isAlive);
    }, [setIsAlive, isAlive]);

    const handleStar = useCallback(pair => {
        const newStars = stars.includes(pair)
            ? stars.filter(star => star !== pair)
            : [...stars, pair]

        setStars(newStars);
        localStorage.setItem('stars', newStars.join(','));
    }, [setStars, stars]);

    const handleHeaderClick = useCallback(({dataKey}) => {
        if (dataKey === sortBy) {
            const newSortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
            setSortDirection(newSortDirection)
            localStorage.setItem('sortDirection', newSortDirection);
            return;
        }

        setSortBy(dataKey);
        localStorage.setItem('sortBy', dataKey);
    }, [sortDirection, sortBy]);

    const handleSearchChange = useCallback(newSearch => {
        setSearch(newSearch);
        localStorage.setItem('search', newSearch);
    }, []);

    const handleRateTypeChange = useCallback(newRateType => {
        setRateType(newRateType);
        localStorage.setItem('rateType', newRateType);
    }, []);

    const handleCategoryItemClick = useCallback((category = '') => {
        setCategory(category);
        localStorage.setItem('category', category);
    }, [])

    const checkCategory = useCallback(item => {
        if (category === 'stars') {
            return item.name.isStar
        }

        if (category === 'margin') {
            return item.name.canMargin
        }

        if (['BTC', 'BNB', 'ALTS', 'USDⓈ'].includes(category)) {
            return item.parentMarket === category;
        }

        if (['USDT', 'BUSD', 'TUSD', 'USDC', 'USDT', 'PAX', 'XRP', 'ETH', 'TRX'].includes(category)) {
            return item.quote === category;
        }
        return true;
    }, [category]);

    const preparedForRenderData = useMemo(() => {
        if (!data) {
            return [];
        }

        return Object.entries(data)
            .map(([pair, {
                lastPrice, change, volume, base, quote, parentMarket
            }]) => ({
                quote,
                base,
                pair,
                parentMarket,
                name: {
                    root: `${base}/${quote}`,
                    canMargin: Math.random() >= 0.5, // random as can not understand how to compute it
                    onStar: handleStar.bind(null, pair),
                    isStar: stars.includes(pair)
                },
                rate: {
                    root: rateType === 'volume' ? volume : change,
                    active: rateType
                },
                lastPrice
            }))
            .filter(item => item.name.root.includes(search) && checkCategory(item))
            .sort(generateSorter({sortDirection, sortBy}));
    }, [data, handleStar, stars, sortBy, sortDirection, search, checkCategory, rateType]);

    const cells = useMemo(() => [{
        label: 'Name',
        dataKey: 'name'
    }, {
        label: 'Last Price',
        dataKey: 'lastPrice'
    }, {
        label: rateType === 'volume' ? 'Volume' : 'Change',
        dataKey: 'rate'
    }], [rateType]);

    // get full products list (only once)
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(api.getProducts)
                const {data: initData} = await response.json();
                console.log(initData, response);

                setData(normalizeData(initData));
            } catch (e) {
                console.log(e);
            }

        })()
    }, [])

    // make connection for data update and close it on unmount
    useEffect(() => {
        socketRef.current = new WebSocket(api.socket);

        return () => {
            socketRef.current.close();
            socketRef.current = null;
        };
    }, []);

    /*
    *   handling isAlive toggling:
    *   if no isAlive and will close connection and stop updating
    *   else will make connection if needed and start updating
    */
    useEffect(() => {
        if (!isAlive) {
            setIsUpdating(false);

            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
                setIsUpdating(false);
            }
            return;
        }

        if (isAlive) {
            setIsUpdating(true);

            if (!socketRef.current) {
                socketRef.current = new WebSocket(api.socket);
            }
        }

    }, [isAlive]);

    // update data from server
    useEffect(() => {
        if (!socketRef.current) {
            return;
        }

        socketRef.current.onmessage = message => {
            if (!isUpdating) {
                return;
            }

            setData(updateData(data, JSON.parse(message.data).data))
        };
    }, [setData, data, isUpdating]);

    // local storage recovery
    useEffect(() => {
        const savedStars = localStorage.getItem('stars');
        const savedSortBy = localStorage.getItem('sortBy');
        const savedSortDirection = localStorage.getItem('sortDirection');
        const savedCategory = localStorage.getItem('category');
        const savedSearch = localStorage.getItem('search');
        const savedRateType = localStorage.getItem('rateType');

        if (savedStars) {
            setStars(savedStars.split(','));
        }

        if (savedSortBy) {
            setSortBy(savedSortBy);
        }

        if (savedSortDirection) {
            setSortDirection(savedSortDirection);
        }

        if (savedCategory) {
            setCategory(savedCategory);
        }

        if (savedSearch) {
            setSearch(savedSearch);
        }

        if (savedRateType) {
            setRateType(savedRateType);
        }
    }, []);

    return <div data-testid={testIds.app} className='app'>
        <div className='app__header-wrapper'>
            <div className='app__layout--60'>
                <Header title='Market' className='app__header'/>
            </div>
            <div className='app__updates-controller app__layout--40'>
                <button
                    title='Pauses or Resumes data updating'
                    onClick={handleUpdatingTogglerClick}
                    className='app__updates-toggler'
                >
                    <Icon icon={isUpdating ? faPause : faPlay}/>
                </button>
                <button
                    title='Closes or Creates socket connection'
                    onClick={handleAliveTogglerClick}
                    className='app__updates-toggler'
                >
                    <Icon icon={isAlive ? faTimes : faCloudDownloadAlt}/>
                </button>
            </div>
        </div>
        <div className='app__currency'>
            {currencyData.map(
                    (dataItem, index) =>
                        <Category
                            key={dataItem.value || index}
                            data={dataItem}
                            activeCategory={category}
                            onClick={handleCategoryItemClick}
                        />
                 )
            }
        </div>
        <div className='app__search-and-rate-wrapper'>
            <div className='app__layout--60'>
                <Search defaultValue={search} onChange={handleSearchChange}/>
            </div>
            <Radio
                data={radioData}
                name='rate'
                className='app__rate app__layout--40'
                onChange={handleRateTypeChange}
                defaultValue={rateType}
            />
        </div>
        <Table
            width={500}
            data={preparedForRenderData}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onHeaderClick={handleHeaderClick}
            cells={cells}
        />
    </div>
}

export default App;
