import React from 'react';
import {render} from '@testing-library/react';
import {faCoffee} from '@fortawesome/free-solid-svg-icons'

import Icon from '.';
import {testIds} from "../../utils/constants";

test('renders icon', () => {
    const {getByTestId} = render(<Icon/>);
    const iconElement = getByTestId(testIds.icon.root);
    expect(iconElement).toBeInTheDocument();
});

test('handles prop icon', () => {
    const {getByTestId} = render(<Icon icon={faCoffee}/>);
    const renderedFAIcon = getByTestId(testIds.icon.instance);
    expect(renderedFAIcon.classList.contains('fa-coffee')).toBe(true);
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Icon className={testClassname}/>);
    const iconElement = getByTestId(testIds.icon.root);
    expect(iconElement.classList.contains(testClassname)).toBe(true);
});
