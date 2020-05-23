import React from 'react';
import {render} from '@testing-library/react';

import Search from '.';
import {testIds} from "../../utils/constants";

test('renders search', () => {
    const {getByTestId} = render(<Search/>);
    const searchElement = getByTestId(testIds.search);
    expect(searchElement).toBeInTheDocument();
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Search className={testClassname}/>);
    const searchElement = getByTestId(testIds.search);
    expect(searchElement.classList.contains(testClassname)).toBe(true);
});
