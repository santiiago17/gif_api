import React from 'react'

export const Card = ({ src, styleImg, styleDiv }) => {
    return (
        <>
            <div className={styleDiv}>
                <img className={styleImg} src={src} alt="GIF" />
            </div>
        </>
    )
}
