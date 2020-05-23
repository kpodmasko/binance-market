import React, {useCallback, useState} from 'react';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons'

import {testIds} from "../../utils/constants";

import './Select.css';
import Icon from "../Icon";

function Select({render, className = '', children, defaultIsOpen}) {
    const [isOpen, setIsOpen] = useState(false);

    const classes = `select ${className}`;
    const testId = testIds.select.root;
    const componentProps = {
        setIsOpen,
        isOpen
    };

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const root = render
        ? render(componentProps)
        : <div>
            Select
        </div>

    return <div className={classes} data-testid={testId}>
        <div className='select__root-wrapper' onClick={handleClick}>
            {root}
            <Icon icon={faCaretDown}/>
        </div>
        {isOpen && <div className='select__drop-down-wrapper'>
            <div className='select__drop-down'>
                {children}
            </div>
        </div>
        }
    </div>
}

export default Select;