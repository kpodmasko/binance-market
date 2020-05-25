import React, {memo} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {testIds} from "../../utils/constants";

import './Icon.css';

function Icon({icon = 'coffee', className = '', onClick}) {
    const classes = `icon ${className}`;

    return <span className={classes} data-testid={testIds.icon.root} onClick={onClick}>
        <FontAwesomeIcon icon={icon} data-testid={testIds.icon.instance} />
    </span>
}

export default memo(Icon);