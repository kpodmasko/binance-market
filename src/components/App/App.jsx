import React, {
    useCallback, useEffect, useState, useRef
} from 'react';
import {
    faStar, faDollarSign, faPause, faPlay, faCloudDownloadAlt, faTimes
} from '@fortawesome/free-solid-svg-icons'

import Header from '../Header';
import Toggler from "../Toggler";
import Select from "../Select";
import Icon from "../Icon";
import Search from "../Search";
import Radio from "../Radio";
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

        <Toggler className='app__currency'>
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
        </Toggler>
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
        {data && Object.entries(data).map(([pair, {lastPrice}]) => {
            return <div key={pair}>
                {pair}:{lastPrice}
            </div>
        })}
    </div>
}

export default App;
