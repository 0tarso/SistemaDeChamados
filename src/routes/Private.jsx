import React from 'react'

import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../contexts/auth'



export const Private = ({ children }) => {
    const { signed, loading } = useContext(AuthContext)

    console.log(signed)

    if (loading) {
        return (
            <div></div>
        )
    }

    if (!signed) {
        return <Navigate to="/" />
    }

    return children
}

export default Private