import React, {Children, useCallback, useState} from 'react';

import {testIds} from "../../utils/constants";

import './Toggler.css';

function Toggler({className = '', children}) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const classes = `toggler ${className}`;

    const handleItemClick = useCallback(index => {
        setSelectedIndex(index);
    }, [setSelectedIndex])

    return <div className={classes} data-testid={testIds.toggler}>
        {Children.map(children, (child, i) => <div
            className={`toggler__item ${i === selectedIndex ? 'toggler__item--selected' : ''}`}
            onClick={handleItemClick.bind(null, i)}
        >
            {child}
        </div>)
        }
    </div>
}

export default Toggler;