import React from 'react';

const MyImage = (props) => {
    return (
        <img src={`data:image/png;base64,${props.data}`} {...props} />
    );
};

export default MyImage;