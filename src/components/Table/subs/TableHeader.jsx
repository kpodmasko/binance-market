import React from 'react'
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";

import Icon from "../../Icon";
import {sort} from '../../../utils/constants';

function getSelectedClassName({dataKey, sortBy, sortDirection, currentSortDirection}) {
    return dataKey === sortBy && sortDirection === currentSortDirection
        ? 'table__sort-switcher--selected'
        : ''
}

function TableHeader({sortDirection, sortBy, label, dataKey}) {
    const propsForSelecting = {
        dataKey,
        sortBy,
        currentSortDirection: sortDirection
    }

    return <div className={`table__header table__header--${dataKey}`}>
        <span title={typeof label === 'string' ? label : null}>{label}</span>
        <div className='table__sort-controller'>
            <Icon icon={faCaretUp} className={
                `table__sort-switcher ${getSelectedClassName({...propsForSelecting, sortDirection: sort.ASC})}`
            }/>
            <Icon icon={faCaretDown} className={
                `table__sort-switcher ${getSelectedClassName({...propsForSelecting, sortDirection: sort.DESC})}`
            }/>
        </div>
    </div>
}

// no memo as unknown about data probided by lib
export default TableHeader