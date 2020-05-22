import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {testIds} from "../../utils/constants";

import './Icon.css';

function Icon({icon = 'coffee', className = ''}) {
    const classes = `icon ${className}`;

    return <span className={classes} data-testid={testIds.icon.root}>
        <FontAwesomeIcon icon={icon} data-testid={testIds.icon.instance} />
    </span>
}

export default Icon;