import React from 'react';
import {faStar} from "@fortawesome/free-solid-svg-icons";

import Icon from "../../Icon";
import {testIds} from "../../../utils/constants";

function renderName({root, canMargin, onStar, isStar} ) {
    return <div className='table__cell table__cell--name' data-testid={testIds.table.cell}>
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
        return <div className='table__cell table__cell--rate' data-testid={testIds.table.cell}>{root}</div>;
    }

    return root >= 0
        ? <div className='table__cell table__cell--rate table__cell--positive-rate' data-testid={testIds.table.cell}>
            +{root}%
        </div>
        : <div className='table__cell table__cell--rate table__cell--negative-rate' data-testid={testIds.table.cell}>
            {root}%
        </div>
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

    return <div className='table__cell' data-testid={testIds.table.cell}>{cellData}</div>;
}

// no memo as unknown about data probided by lib
export default TableCell;