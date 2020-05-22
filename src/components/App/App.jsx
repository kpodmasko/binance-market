import React from 'react';

import Header from '../Header';
import Toggler from "../Toggler";
import Select from "../Select";
import {testIds} from "../../utils/constants";

import './App.css';

function App() {
    return <div data-testid={testIds.app} className='app'>
        <Header title='Market' className='app__header'/>
        <Toggler>
            <Select>
                asd
            </Select>
            <Select>
                ssd
            </Select>
        </Toggler>
    </div>
}

export default App;
