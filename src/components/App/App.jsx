import React from 'react';

import Header from '../Header';
import {testIds} from "../../utils/constants";

import './App.css';

function App() {
    return <div data-testid={testIds.app}>
        <Header title='Market' className='app__header'/>
        init
    </div>
}

export default App;
