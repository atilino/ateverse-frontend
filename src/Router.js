
import Layout from './components/Layout'
import React from 'react'
import {
    Navigate,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom'

import { Login } from './pages/auth'
import { NewOrder, OrderDetail, Orders, OrdersLayout } from './pages/orders'
import { Accounts, AccountsLayout, AccountsSummary, BlockedProfiles, MyAccounts, Profiles, Templates } from './pages/accounts'
import { Users } from './pages/users'
import { Customers } from './pages/customers'
import { Dashboard } from './pages/dashboard'
import { DeviceDetail, Devices, DevicesLayout, Processes } from './pages/devices'
import useAuth from 'hooks/useAuth'

function Router() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<ProtectedLayout />}>
                <Route index element={<Dashboard/>} />
                <Route path='orders/*' element={<OrdersLayout />}>
                    <Route index path='new' element={<NewOrder />} />
                    <Route path='my-orders' element={<Orders />} />
                    <Route path=':orderId' element={<OrderDetail />} />
                </Route>
                <Route path='customers/*' element={<Customers />} />
                <Route path='accounts/*' element={<AccountsLayout />}>
                    <Route index path='my-accounts' element={<Accounts />} />
                    <Route path='summary' element={<AccountsSummary />} />
                    <Route path=':accountId/profiles' element={<Profiles />} />
                    <Route path='blocked-profiles' element={<BlockedProfiles />} />
                    <Route path='personalities' element={<Templates />} />
                </Route>
                <Route path='devices' element={<DevicesLayout />} >
                    <Route index path='*' element={<Devices />} />
                    <Route path=':deviceId/detail' element={<DeviceDetail />} />
                    <Route path=':deviceId/processes' element={<Processes />} />
                </Route>
                <Route path='users' element={<Users />} />
            </Route>
            <Route path='*' element={<h1>Not found</h1>} />
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
            <Outlet />
        </Layout >
    )
}


export default Router;
