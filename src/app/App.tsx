import * as React from 'react';
import { tailwindMatcher } from 'tailwind-matcher';
import Color from './components/Color';

import './styles/ui.css';

const colors = require('tailwindcss/colors');
const flatten = require('flat');

// Flatten the Tailwind CSS color object for fast lookup
const tailwindReference = flatten(colors, { delimiter: '-' });

declare function require(path: string): any;

const App: React.FC = () => {
    const [actual, changeActual] = React.useState(''); // Holds the Figma node color
    const [tailwind, changeTailwind] = React.useState(''); // Holds the matched Tailwind color

    React.useEffect(() => {
        // Reads the message from the controller and updates on change
        window.onmessage = (event) => {
            // The UI will receive an array as a message from the controller
            // This includes the type of message and the content of the message
            // The type is either 'hex' (a valid color was found) or 'none' (no valid color was found)
            const { type, message } = event.data.pluginMessage;
            if (type === 'hex') {
                changeActual(message.toUpperCase());
                changeTailwind(tailwindMatcher(message));
            } else if (type === 'none') {
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
