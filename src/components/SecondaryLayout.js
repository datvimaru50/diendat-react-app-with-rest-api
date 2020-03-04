import React from 'react';

const SecondaryLayout = (props) => {
    return (
        <div id="list-layout" className="main-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="mainbar">
                            {props.content.mainBar}                            
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="sidebar">
                            {props.content.sideBar} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondaryLayout;