import React, {useCallback} from 'react';
import {Column as VirtualizedColumn, Table as VirtualizedTable} from 'react-virtualized';

import {TableCell} from './subs';
import {testIds} from "../../utils/constants";

import './Table.css';

function Table({className = '', data = [], width = 300, height = 500, headerHeight = 50, rowHeight = 40}) {
    const classes = `table ${className}`;

    const rowGetter = useCallback(({index}) => data[index], [data]);

    return <div className={classes} data-testid={testIds.table}>
        <VirtualizedTable
            width={width}
            height={height}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            rowCount={data.length}
            rowGetter={rowGetter}
        >
            <VirtualizedColumn
                label="Name"
                cellRenderer={TableCell}
                dataKey="name"
                width={parseInt(width/3, 10)}
            />
            <VirtualizedColumn
                label="Latest Price"
                cellRenderer={TableCell}
                dataKey="lastPrice"
                width={parseInt(width/3, 10)}
            />
            <VirtualizedColumn
                label="Change"
                cellRenderer={TableCell}
                dataKey="rate"
                width={parseInt(width/3, 10)}
            />
        </VirtualizedTable>
    </div>
}

export default Table;