import React from 'react';

import {testIds} from "../../utils/constants";

import './Header.css';

function Header({title = '', className = ''}) {
    const classes = `header ${className}`;

    return <header className={classes} data-testid={testIds.header}>
        <h1 className='header__title'>{title}</h1>
    </header>
}

export default Header;