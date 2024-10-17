import { Routes, Route } from 'react-router-dom'

import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'



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
                element={<Dashboard />}
            />
        </Routes>
    )
}

export default RoutesApp