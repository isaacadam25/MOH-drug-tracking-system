import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { getAuthToken, getProfile } from "../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                props => {
                    if (!getProfile(getAuthToken())) return <Redirect to="/auth" />;
                    return Component ? <Component {...props} /> : render(props)
                }
            }
        />
    );
};

export default ProtectedRoute;