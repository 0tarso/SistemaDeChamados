import { Routes, Route } from 'react-router-dom'

import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import Private from './Private'



const RoutesApp = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<SignIn />}
            />

            <Route
                path='/register'
                element={<SignUp />}
            />

            <Route
                path='/dashboard'
                element={
                    <Private>
                        <Dashboard />
                    </Private>
                }
            />
        </Routes>
    )
}

export default RoutesApp