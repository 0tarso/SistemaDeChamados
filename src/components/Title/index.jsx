import React from 'react'

import "./title.css"

const Title = ({ children, title }) => {
    return (
        <div className='title'>
            {children}
            <span>{title}</span>
        </div>
    )
}

export default Title