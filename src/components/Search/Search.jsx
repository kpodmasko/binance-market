import React, {useState, useCallback} from 'react';
import {faSearch} from "@fortawesome/free-solid-svg-icons";

import {testIds} from "../../utils/constants";

import './Search.css';
import Icon from "../Icon";

function Search({className = ''}) {
    const [value, setValue] = useState('');

    const classes = `search ${className}`;

    const handleChange = useCallback(event => {
        setValue(event.target.value);
    }, []);

    return <div className={classes} data-testid={testIds.search}>
        <Icon icon={faSearch} className='search__icon'/>
        <input placeholder='Search' value={value} onChange={handleChange}/>
    </div>
}

export default Search;