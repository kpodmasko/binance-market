import React from 'react';
import {render} from '@testing-library/react';

import Toggler from '.';
import {testIds} from "../../utils/constants";

test('renders toggler', () => {
    const {getByTestId} = render(<Toggler/>);
    const togglerElement = getByTestId(testIds.toggler);
    expect(togglerElement).toBeInTheDocument();
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Toggler className={testClassname}/>);
    const togglerElement = getByTestId(testIds.toggler);
    expect(togglerElement.classList.contains(testClassname)).toBe(true);
});
