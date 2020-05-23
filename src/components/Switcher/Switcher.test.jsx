import React from 'react';
import {render} from '@testing-library/react';

import Switcher from '.';
import {testIds} from "../../utils/constants";

test('renders switcher', () => {
    const {getByTestId} = render(<Switcher/>);
    const switcherElement = getByTestId(testIds.switcher);
    expect(switcherElement).toBeInTheDocument();
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Switcher className={testClassname}/>);
    const switcherElement = getByTestId(testIds.switcher);
    expect(switcherElement.classList.contains(testClassname)).toBe(true);
});
