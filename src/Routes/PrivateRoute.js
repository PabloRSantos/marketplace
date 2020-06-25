import {autenticacao} from "./auth"
import {Route, Redirect} from "react-router-dom"
import React from "react"

const PrivateRoute = ({component: Component, ... rest}) => (
    <Route {... rest} render={props => (
        autenticacao() ? (
             <Component {... props} />
        ) : (
            <Redirect to={{pathname: `/`, state: {from: props.location}}} />
        )
    )} />
)

export default PrivateRoute