import React from "react";
import { Route, Redirect } from "react-router-dom";




const PrivateRoute: React.FC<{
        component: React.FC;
        path: string;
        exact: Boolean;
    }> = (props) => {
    
    const identity = localStorage.getItem('identity');
    console.log(identity);
    var flag;
    if(identity.name || identity == null){
        flag = false;
    } else {
        flag = true;    
    }

   
    return flag ? (<Route path={props.path} exact={props.exact} component={props.component} />) :
        (<Redirect to="/login"></Redirect>);
};

export default PrivateRoute;