import React from 'react';
import {render} from '@testing-library/react';

import Search from '.';
import {testIds} from "../../utils/constants";

test('renders search', () => {
    const {getByTestId} = render(<Search/>);
    const iconElement = getByTestId(testIds.search);
    expect(iconElement).toBeInTheDocument();
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Search className={testClassname}/>);
    const iconElement = getByTestId(testIds.search);
    expect(iconElement.classList.contains(testClassname)).toBe(true);
});
