import React from 'react';
import {render} from '@testing-library/react';

import Radio from '.';
import {testIds} from "../../utils/constants";

test('renders radio', () => {
    const {getByTestId} = render(<Radio/>);
    const radioElement = getByTestId(testIds.radio);
    expect(radioElement).toBeInTheDocument();
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Radio className={testClassname}/>);
    const radioElement = getByTestId(testIds.radio);
    expect(radioElement.classList.contains(testClassname)).toBe(true);
});
