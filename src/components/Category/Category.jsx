import React, {useCallback, memo} from 'react';

import Select from "../Select";
import {testIds} from "../../utils/constants";

import './Category.css';

function Category({className = '', activeCategory, data, onClick}) {
    const renderSelect = useCallback(
        categoryLabel => {
            return ({setIsOpen, isOpen}) => <div onClick={/*TODO: think*/() => setIsOpen(!isOpen)}>
                {categoryLabel}
            </div>
        }, []
    );

    const handleClick = useCallback(() => {
        onClick(data.value);
    }, [onClick, data])

    if (Array.isArray(data)) {
        return <Select className='category' render={renderSelect(data[0].label)}>
            <div>
                {data.map(
                    (dataItem, index) =>
                        <Category
                            key={dataItem.value || index}
                            className={className}
                            data={dataItem}
                            onClick={onClick}
                            activeCategory={activeCategory}
                        />
                )}
            </div>
        </Select>
    }

    const classes = `category ${className} ${activeCategory === data.value ? 'category--selected' : ''}`;

    return <div className={classes} onClick={handleClick} data-testid={testIds.category}>
        {data.label}
    </div>
}

export default memo(Category);