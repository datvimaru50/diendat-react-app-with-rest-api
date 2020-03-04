import React from 'react';
import PropTypes from 'prop-types';

const MainSection = (props) => {
    return (

        <section id={props.id} className="main-section">
            <div className="container">
                {props.children}
            </div>
        </section>
    );
}
MainSection.propTypes = { 
    id: PropTypes.string.isRequired
}

export default MainSection;