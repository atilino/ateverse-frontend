import Layout from './components/Layout'
import React from 'react'
import {
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'

import { Login } from './pages/auth'
import { NewOrder, Orders } from './pages/orders'
import { Accounts, BlockedProfiles, Profiles, Templates } from './pages/accounts'
import { Users } from './pages/users'
import { Detail, Devices, Processes } from './pages/devices'
import useAuth from 'hooks/useAuth'

function Router() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route
                index
                element={
                    <ProtectedLayout>
                        <NewOrder />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/orders'
                element={
                    <ProtectedLayout>
                        <Orders />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/accounts'
                element={
                    <ProtectedLayout>
                        <Accounts />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/accounts/:accountId/profiles'
                element={
                    <ProtectedLayout>
                        <Profiles />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/blocked-profiles'
                element={
                    <ProtectedLayout>
                        <BlockedProfiles />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/personalities'
                element={
                    <ProtectedLayout>
                        <Templates />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/devices'
                element={
                    <ProtectedLayout>
                        <Devices />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/devices/:deviceId/detail'
                element={
                    <ProtectedLayout>
                        <Detail />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/devices/:deviceId/processes'
                element={
                    <ProtectedLayout>
                        <Processes />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/users'
                element={
                    <ProtectedLayout>
                        <Users />
                    </ProtectedLayout>
                }
            />
            <Route path='*' component={<h1>Not found</h1>} />
        </Routes>
    );
}

const ProtectedLayout = ({ children }) => {
    const { user } = useAuth()
    if (!user) {
        return <Navigate to='/login' />
    }
    return (
        <Layout>
            {children}
        </Layout >
    )
}


export default Router;
