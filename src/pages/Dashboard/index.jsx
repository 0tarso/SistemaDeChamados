import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header'

const Dashboard = () => {

    const { logout } = useContext(AuthContext)

    return (
        <div>
            <Header />
            <h1>Página dashboard</h1>
        </div>
    )
}

export default Dashboard