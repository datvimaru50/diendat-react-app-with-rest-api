import React from 'react';
const Main = (props) => {
    if(props.mobileMenuOpened) return null
    return (
      <main>
          {props.children}
      </main>
    );
};

export default Main;