import React, {useCallback} from 'react';
import {faStar, faDollarSign} from '@fortawesome/free-solid-svg-icons'

import Header from '../Header';
import Toggler from "../Toggler";
import Select from "../Select";
import Icon from "../Icon";
import Search from "../Search";
import {testIds} from "../../utils/constants";

import './App.css';

function App() {
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

    return <div data-testid={testIds.app} className='app'>
        <Header title='Market' className='app__header'/>
        <Toggler>
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
        <div className='app__search-and-toggler-wrapper'>
            <div className='app__layout--60'>
                <Search/>
            </div>
            <Toggler className='app__layout--40'>
                <label><input type='radio'/>Change</label>
                <label><input type='radio'/>Volume</label>
            </Toggler>
        </div>
    </div>
}

export default App;
