import React from 'react';

export default class Loading extends React.Component {
    render() {
        return (
            <div className="main">
                <h1>
                    We're Getting Your Games For You Now...
                </h1>
                <img src="loading.gif" alt="Loading" />
            </div>
        );
    }
}