import React from 'react';
const SectionBody = (props) => {
    return(
        <div className="row section-body">
            {props.children}
        </div>
    );
}

export default SectionBody;