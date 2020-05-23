import React, {useCallback} from 'react';

import {testIds} from "../../utils/constants";

import './Category.css';
import Select from "../Select";

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
                    dataItem =>
                        <Category
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

export default Category;