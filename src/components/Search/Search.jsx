import React, {useState, useCallback, memo} from 'react';
import {faSearch} from "@fortawesome/free-solid-svg-icons";

import Icon from "../Icon";
import {testIds} from "../../utils/constants";

import './Search.css';

function Search({className = '', defaultValue = '', onChange}) {
    const [value, setValue] = useState('');

    const classes = `search ${className}`;

    const handleChange = useCallback(event => {
        const newValue = event.target.value;

        setValue(newValue);

        if (onChange) {
            onChange(newValue);
        }
    }, [onChange]);

    return <div className={classes} data-testid={testIds.search}>
        <Icon icon={faSearch} className='search__icon'/>
        <input placeholder='Search' value={defaultValue || value} onChange={handleChange}/>
    </div>
}

export default memo(Search);