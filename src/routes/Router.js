import Layout from '../components/Layout'
import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import {
    AccountManager,
    Orders,
    Devices,
    Login,
    MonitDevices,
    OrderManager,
    ProfileManager,
    UserManager,
    NetworksManager,
    PersonalityTemplateManager,
    BlockedProfiles
} from '../pages'

import { currentUser } from '../libs/userInfo'

function Router() {
    const { token, isModerator, isAdmin } = currentUser()
    if (!token) {
        return <Login />
    }

    return (
        <BrowserRouter>
            <Redirect from="/" to="/orders/create" />
            <Switch>
                <LayoutRoute index path='/orders/create' authorization={true} >
                    <Orders/>
                </LayoutRoute>

                <LayoutRoute path='/orders/status' authorization={true} >
                    <OrderManager />
                </LayoutRoute>

                <LayoutRoute path='/accounts/manage' authorization={isAdmin || isModerator} >
                    <AccountManager />
                </LayoutRoute>

                <LayoutRoute path='/accounts/:id/profile' authorization={isAdmin || isModerator} >
                    <ProfileManager />
                </LayoutRoute>

                <LayoutRoute path='/accounts/personalities/templates' authorization={isAdmin || isModerator} >
                    <PersonalityTemplateManager/>
                </LayoutRoute>

                <LayoutRoute path='/accounts/profiles/blocked' authorization={isAdmin || isModerator} >
                    <BlockedProfiles/>
                </LayoutRoute>

                <LayoutRoute path='/accounts/activity' authorization={isAdmin || isModerator} >
                </LayoutRoute>

                <LayoutRoute path='/accounts/:id/activity' authorization={isAdmin || isModerator} >
                </LayoutRoute>

                <LayoutRoute path='/networks' authorization={isAdmin} >
                    <NetworksManager />
                </LayoutRoute>

                <LayoutRoute path='/devices/monit' authorization={isAdmin}>
                    <MonitDevices />
                </LayoutRoute>

                <LayoutRoute path='/devices/manage' authorization={isAdmin}>
                    <Devices />
                </LayoutRoute>

                <LayoutRoute path='/users/manage' authorization={isAdmin} >
                    <UserManager />
                </LayoutRoute>

                <Route render={() => <h1>Not found!</h1>} />
                <Redirect from="/*" to="/" />
            </Switch>
        </BrowserRouter>
    );
}

const LayoutRoute = ({ component: Component, authorization, children, ...rest }) => (
    authorization &&
    <Route {...rest} render={(props) =>
        <Layout {...props}>
            {children || Component}
        </Layout>
    } />
)
export default Router;
