import React, {useCallback} from 'react';
import {Column as VirtualizedColumn, Table as VirtualizedTable} from 'react-virtualized';

import {TableCell, TableHeader} from './subs';
import {testIds} from "../../utils/constants";

import './Table.css';

function Table({className = '', data = [], width = 300, height = 500, headerHeight = 50, rowHeight = 40, sortBy = 'name', sortDirection = 'ASC', onHeaderClick, cells}) {
    const classes = `table ${className}`;

    const rowGetter = useCallback(({index}) => data[index], [data]);

    if (!cells) {
        return null;
    }

    return <div className={classes} data-testid={testIds.table.root}>
        <VirtualizedTable
            width={width}
            height={height}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            rowCount={data.length}
            rowGetter={rowGetter}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onHeaderClick={onHeaderClick}
        >
            {
                cells.map(cell => <VirtualizedColumn
                    {...cell}
                    key={cell.dataKey}
                    cellRenderer={TableCell}
                    headerRenderer={TableHeader}
                    width={parseInt(width / cells.length, 10)}
                />)
            }
        </VirtualizedTable>
    </div>
}

export default Table;