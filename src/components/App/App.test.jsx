import React from 'react';
import {render} from '@testing-library/react';

import App from '.';
import {testIds} from "../../utils/constants";

test('renders app', () => {
    const {getByTestId} = render(<App/>);
    const appElement = getByTestId(testIds.app);
    expect(appElement).toBeInTheDocument();
});
