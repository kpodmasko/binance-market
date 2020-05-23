import React from 'react';
import {render} from '@testing-library/react';

import Table from '.';
import {testIds} from "../../utils/constants";

test('renders table', () => {
    const {getByTestId} = render(<Table/>);
    const tableElement = getByTestId(testIds.table);
    expect(tableElement).toBeInTheDocument();
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Table className={testClassname}/>);
    const tableElement = getByTestId(testIds.table);
    expect(tableElement.classList.contains(testClassname)).toBe(true);
});
