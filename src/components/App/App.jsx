import React, {
    useCallback, useEffect, useState, useRef, useMemo
} from 'react';
import {
    faStar, faDollarSign, faPause, faPlay, faCloudDownloadAlt, faTimes
} from '@fortawesome/free-solid-svg-icons'

import Header from '../Header';
import Switcher from "../Switcher";
import Select from "../Select";
import Icon from "../Icon";
import Search from "../Search";
import Radio from "../Radio";
import Table from "../Table";
import {testIds} from "../../utils/constants";
import {
    api, normalizeData, updateData
} from "../../utils/binanceHelper";

import './App.css';

const radioData = [{
    label: 'Change',
    value: 'change'
}, {
    label: 'Volume',
    value: 'volume'
}]

function App() {
    const [data, setData] = useState(null);
    const [isUpdating, setIsUpdating] = useState(true);
    const [isAlive, setIsAlive] = useState(true);
    const [stars, setStars] = useState([]);

    const socketRef = useRef(null);

    const renderALTS = useCallback(
        ({setIsOpen, isOpen}) => <div onClick={/*TODO: think*/() => setIsOpen(!isOpen)}>
            ALTS
        </div>, []
    );

    const renderJSD = useCallback(
        ({setIsOpen, isOpen}) => <div onClick={/*TODO: think*/() => setIsOpen(!isOpen)}>
            JSD
            <Icon icon={faDollarSign}/>
        </div>, []
    );

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

    const preparedForRenderData = useMemo(() => {
        if (!data) {
            return [];
        }

        return Object.entries(data).map(([pair, {
            lastPrice, change, volume, base, quote
        }]) => ({
            pair,
            name: {
                root: `${base}/${quote}`,
                canMargin: Math.random() >= 0.5, // random as can not understand how to compute it
                onStar: handleStar.bind(null, pair),
                isStar: stars.includes(pair)
            },
            rate: {
                root: change,
                active: 'change'
            },
            lastPrice
        }));
    }, [data, handleStar, stars]);

    // get full products list (only once)
    useEffect(() => {
        (async () => {
            const response = await fetch(api.getProducts)
            const {data: initData} = await response.json();

            setData(normalizeData(initData));
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

    // start recovery
    useEffect(() => {
        const savedStars = localStorage.getItem('stars');

        if (savedStars) {
            setStars(savedStars.split(','));
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

        <Switcher className='app__currency'>
            <Icon icon={faStar}/>
            <span>Margin</span>
            <span>BNB</span>
            <span>BTC</span>
            <Select render={renderALTS}>
                altsopen
            </Select>
            <Select render={renderJSD}>
                jsdopen
            </Select>
        </Switcher>
        <div className='app__search-and-rate-wrapper'>
            <div className='app__layout--60'>
                <Search/>
            </div>
            <Radio
                data={radioData}
                name='rate'
                className='app__rate app__layout--40'
            />
        </div>
        <Table width={500} data={preparedForRenderData}/>
    </div>
}

export default App;
