import React, {Children, useCallback, useState} from 'react';

import {testIds} from "../../utils/constants";

import './Switcher.css';

function Switcher({className = '', children}) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const classes = `switcher ${className}`;

    const handleItemClick = useCallback(index => {
        setSelectedIndex(index);
    }, [setSelectedIndex])

    return <div className={classes} data-testid={testIds.switcher}>
        {Children.map(children, (child, i) => <div
            className={`switcher__item ${i === selectedIndex ? 'switcher__item--selected' : ''}`}
            onClick={handleItemClick.bind(null, i)}
        >
            {child}
        </div>)
        }
    </div>
}

export default Switcher;