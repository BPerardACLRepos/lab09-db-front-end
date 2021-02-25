import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

export default withRouter(class Header extends React.Component {
    render() {
        return (
            <header>
                <NavLink exact activeClassName="current-page" to="/">
                    List
                </NavLink>
                <NavLink exact activeClassName="current-page" to="/create">
                    Create
                </NavLink>
                <hr />
            </header>
        )
    }
})