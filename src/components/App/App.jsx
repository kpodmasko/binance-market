import React from 'react';
import './App.css';
import {testIds} from "../../utils/constants";

function App() {
    return <div data-testid={testIds.app}>
        init
    </div>
}

export default App;
