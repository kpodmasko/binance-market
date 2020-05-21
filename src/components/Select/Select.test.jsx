import React from 'react';
import {render} from '@testing-library/react';

import Select from '.';
import {testIds} from "../../utils/constants";

test('renders select', () => {
    const {getByTestId} = render(<Select/>);
    const selectElement = getByTestId(testIds.select.root);
    expect(selectElement).toBeInTheDocument();
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Select className={testClassname}/>);
    const selectElement = getByTestId(testIds.select.root);
    expect(selectElement.classList.contains(testClassname)).toBe(true);
});
