figma.showUI(__html__);

figma.on('selectionchange', () => {
    // Converts to 255-based RGB value
    function getRGB({r, g, b}) {
        const rgbColorArray = [r, g, b].map((channel) => Math.round(channel * 255));
        return rgbColorArray;
    }

    // Converts an RGB array in an hex array
    function convertRgbToHex(color) {
        const hex = color
            .map((col) => {
                const hexColor = col.toString(16);
                return `0${hexColor}`.slice(-2);
            })
            .join('');
        return `#${hex}`;
    }

    try {
        const selection = figma.currentPage.selection.filter(
            (node) => node.fills.length > 0 && node.fills[0].type === 'SOLID'
        );

        const color = getRGB(selection[0].fills[0].color);
        const hexColor = convertRgbToHex(color);

        figma.ui.postMessage({
            type: 'hex',
            message: `${hexColor}`,
        });
    } catch (error) {
        figma.ui.postMessage({
            type: 'none',
            message: '',
        });
    }
});
