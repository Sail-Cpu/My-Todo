import React from 'react';

export const allColors = [
    "#273746",
    "#9B59B6",
    "#C0392B",
    "#2980B9",
    "#E6B0AA",
    "#16A085"
]

type Props = {
    color: string,
    setColor: (color: string) => void
}

const Colors = ( {color, setColor} : Props ) => {

    return(
        <div className="colors-container">
            {
                allColors.map((col, idx) => {
                    return(
                        <div
                            key={idx}
                            className="color"
                            style={{backgroundColor: col,
                                border: color === col ? "2px solid #ffe200" : ""}}
                            onClick={() => setColor(col)}
                        ></div>
                    )
                })
            }
        </div>
    )
}

export default Colors;