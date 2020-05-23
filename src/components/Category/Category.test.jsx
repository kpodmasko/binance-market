import React from 'react';
import {render} from '@testing-library/react';

import Category from '.';
import {testIds} from "../../utils/constants";

const testCategory = {
    label: 'test',
    value: 'test'
}

test('renders category', () => {
    const {getByTestId} = render(<Category data={testCategory}/>);
    const categoryElement = getByTestId(testIds.category);
    expect(categoryElement).toBeInTheDocument();
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Category className={testClassname} data={testCategory}/>);
    const categoryElement = getByTestId(testIds.category);
    expect(categoryElement.classList.contains(testClassname)).toBe(true);
});
