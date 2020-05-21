import React, {useCallback, useState} from 'react';

import {testIds} from "../../utils/constants";

import './Select.css';

function Select({render, className = ''}) {
    const [isOpen, setIsOpen] = useState(false);

    const classes = `select ${className}`;
    const testId = testIds.select.root;
    const componentProps = {
        'data-testid': testId,
        className: classes,
        setIsOpen,
        isOpen
    };

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    return <>
        {render ? render(componentProps) : <div data-testid={testId} onClick={handleClick} className={classes}>
            Select
        </div>}
        {isOpen && 'open'}
    </>
}

export default Select;