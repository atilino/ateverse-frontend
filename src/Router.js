import Layout from './components/Layout'
import React from 'react'
import {
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'

import { currentUser } from './libs/userInfo'
import { Login } from './pages/auth'
import { NewOrder, Orders } from './pages/orders'
import { Accounts, BlockedProfiles, Profiles, Templates } from './pages/accounts'
import { Users } from './pages/users'
import { Detail, Devices } from './pages/devices'

function Router() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Protected><NewOrder /> </Protected>} />
            <Route path='/orders' element={<Protected><Orders /></Protected>} />

            <Route path='/accounts' element={<Protected><Accounts /> </Protected>} />
            <Route path='/accounts/:accountId/profiles' element={<Protected><Profiles /> </Protected>} />
            <Route path='/blocked-profiles' element={<Protected><BlockedProfiles /> </Protected>} />
            <Route path='/personalities' element={<Protected><Templates /></Protected>} />
            <Route path='/devices' element={<Protected><Devices /> </Protected>} />
            <Route path='/devices/:deviceId/detail' element={<Protected><Detail /> </Protected>} />
            <Route path='/users' element={<Protected><Users /> </Protected>} />
        </Routes>
    );
}

const Protected = ({ authorization, children }) => {
    const { token } = currentUser()
    if (!token) {
        return <Navigate to='/login' />
    }
    return (
        <Layout>
            {children}
        </Layout >
    )
}
export default Router;
