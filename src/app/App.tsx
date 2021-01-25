import * as React from 'react';
import './styles/ui.css';

import {tailwindMatcher} from 'tailwind-matcher';
import Color from './components/Color';

const colors = require('tailwindcss/colors');
const flatten = require('flat');

const tailwindReference = flatten(colors, {delimiter: '-'});

declare function require(path: string): any;

const App = ({}) => {
    const [actual, changeActual] = React.useState('');
    const [tailwind, changeTailwind] = React.useState('');

    React.useEffect(() => {
        // Reads the message from the controller and updates on change
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'hex') {
                changeActual(message.toUpperCase());
                changeTailwind(tailwindMatcher(message));
            } else {
                changeActual(message);
                changeTailwind(message);
            }
        };
    }, []);

    return (
        <div>
            <h2>Tailwind CSS Matcher</h2>
            <Color name="Actual color" bg={actual} value={actual} />
            <Color name="Tailwind color" bg={tailwindReference[tailwind]} value={tailwind} />
        </div>
    );
};

export default App;
