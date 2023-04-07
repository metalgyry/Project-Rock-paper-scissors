import React from 'react'
import { Route, Switch, Redirect} from 'react-router-dom';
import { noAuthRouters, authRouters } from './routes';

export default function AppRouter() {
    
  return (
    <Switch>
        { localStorage.getItem("token") ?
        authRouters.map(({path, Component}) => { return <Route key={path} path={path} component={Component} exact/> }) : 
        noAuthRouters.map(({path, Component}) => { return <Route key={path} path={path} component={Component} exact/> })
        }
        { localStorage.getItem("token") ? <Redirect to={"/main"}/> : <Redirect to={"/login"}/> }
    </Switch>
  )
}
