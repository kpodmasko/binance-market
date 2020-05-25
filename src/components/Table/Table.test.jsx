import React from 'react';
import {render} from '@testing-library/react';

import Table from '.';
import {testIds} from "../../utils/constants";

const testCells = [{
    label: 'test',
    dataKey: 'test'
}]

test('renders table', () => {
    const {getByTestId} = render(<Table cells={testCells}/>);
    const tableElement = getByTestId(testIds.table.root);
    expect(tableElement).toBeInTheDocument();
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Table className={testClassname} cells={testCells}/>);
    const tableElement = getByTestId(testIds.table.root);
    expect(tableElement.classList.contains(testClassname)).toBe(true);
});
