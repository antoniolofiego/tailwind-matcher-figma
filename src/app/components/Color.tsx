import React from 'react';

export default function Color({name, bg, value}) {
    const colorBox = {
        backgroundColor: bg,
        height: '32px',
        width: '32px',
        border: '1px black solid',
    };

    const description = {
        marginLeft: '12px',
    };

    const wrapper = {
        display: 'flex',
        paddingBottom: '20px',
        verticalAlign: 'middle',
        alignItems: 'center',
    };

    return (
        <div style={wrapper}>
            <span style={colorBox} />
            <span style={description}>
                {name}: {value}
            </span>
        </div>
    );
}
