import React, {useState, useCallback} from 'react';

import {testIds} from "../../utils/constants";

import './Radio.css';

function Radio({data = [], className = '', name = ''}) {
    const [value, setValue] = useState('');

    const classes = `radio ${className}`;

    const handleChange = useCallback(event => {
        setValue(event.currentTarget.value);
    }, [setValue]);

    return <div className={classes} data-testid={testIds.radio}>
        {
            data.map(
                dataItem => <label className='radio__item' key={dataItem.value}>
                    <input
                        type='radio'
                        name={name}
                        value={dataItem.value}
                        checked={dataItem.value === value}
                        onChange={handleChange}
                        className='radio__instance'
                    />
                    {dataItem.label}
                </label>
            )
        }
    </div>
}

export default Radio;