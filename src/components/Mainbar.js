import React from 'react';

const Mainbar = (props) => {
    return (
        <div className="mainbar">
            {props.children}
        </div>
    );
}
export default Mainbar;