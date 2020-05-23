import React from 'react';

import Icon from "../../Icon";
import {faStar} from "@fortawesome/free-solid-svg-icons";

function renderName({root, canMargin, onStar, isStar} ) {
    return <div className='table__cell table__cell--name'>
        <span className={`table__star ${isStar ? 'table__star--selected' : ''}`}>
            <Icon icon={faStar} onClick={onStar}/>
        </span>
        {root}
        {
            canMargin && <span className='table__margin'>
                5x
            </span>
        }
    </div>
}

function renderRate({root, active}) {
    if (active === 'volume') {
        return root;
    }

    return root > 0
        ? <div className='table__cell table__cell--rate table__cell--positive-rate'>+{root}%</div>
        : <div className='table__cell table__cell--rate table__cell--negative-rate'>{root}%</div>
}

function TableCell({cellData, dataKey}) {
    if (cellData == null) {
        return '';
    }

    if (dataKey === 'rate') {
        return renderRate(cellData);
    }

    if (dataKey === 'name') {
        return renderName(cellData);
    }

    return <div className='table__cell'>{cellData}</div>;
}

export default TableCell;