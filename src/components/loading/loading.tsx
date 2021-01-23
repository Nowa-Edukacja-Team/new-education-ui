import "./styles.scss";

import React from "react";
import Spinner from "react-bootstrap/Spinner";

interface Props {
    text?: string;
}

const LoadingIndicator = ({text}: Props) => (
    <div className='loading-indicator-container'>
        <Spinner animation="border" role="status" className='loading-indicator'>
            <span className="sr-only">Loading...</span>
        </Spinner>
        { text && <span className='loading-indicator-text'>{text}</span> }
    </div>
);

export default LoadingIndicator;