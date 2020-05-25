import React, {useState, useCallback, memo} from 'react';

import {testIds} from "../../utils/constants";

import './Radio.css';

function Radio({data = [], className = '', name = '', defaultValue, onChange}) {
    const [value, setValue] = useState('');

    const classes = `radio ${className}`;

    const handleChange = useCallback(event => {
        const newValue = event.currentTarget.value;

        setValue(newValue);

        if (onChange) {
            onChange(newValue);
        }
    }, [onChange, setValue]);

    return <div className={classes} data-testid={testIds.radio}>
        {
            data.map(
                dataItem => <label className='radio__item' key={dataItem.value}>
                    <input
                        type='radio'
                        name={name}
                        value={dataItem.value}
                        checked={dataItem.value === (defaultValue || value)}
                        onChange={handleChange}
                        className='radio__instance'
                    />
                    {dataItem.label}
                </label>
            )
        }
    </div>
}

export default memo(Radio);