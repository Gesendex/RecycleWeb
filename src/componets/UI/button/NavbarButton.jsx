import React from 'react';

const NavbarButton = ({children, ...props}) => {
    return (
        <button {...props}>
            {children}
        </button>
    );
};

export default NavbarButton;