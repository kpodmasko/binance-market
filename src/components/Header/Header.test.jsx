import React from 'react';
import {render} from '@testing-library/react';

import Header from '.';
import {testIds} from "../../utils/constants";

test('renders header', () => {
    const {getByTestId} = render(<Header/>);
    const headerElement = getByTestId(testIds.header);
    expect(headerElement).toBeInTheDocument();
});

test('handles prop title', () => {
    const title = 'Header title';
    const {getByText} = render(<Header title={title}/>);
    const renderedTitle = getByText(title);
    expect(renderedTitle).toBeInTheDocument();
});

test('handles prop className', () => {
    const testClassname = 'test-classname';
    const {getByTestId} = render(<Header className={testClassname}/>);
    const headerElement = getByTestId(testIds.header);
    expect(headerElement.classList.contains(testClassname)).toBe(true);
});
