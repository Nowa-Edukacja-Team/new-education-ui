
import React from 'react';
import { Link } from 'react-router-dom';
import CustomNavbarBase, { CustomNavbarItemProps } from '../../../forms/inputs/dropdownItem/item';

export interface RedirectNavbarItemProps extends CustomNavbarItemProps<void> {
    redirectUrl: string;
    shouldOpenNewPage?: boolean;
}

const RedirectNavbarElement = (props: RedirectNavbarItemProps) => {
    const { redirectUrl, shouldOpenNewPage, ...restProps } = props;

    if(redirectUrl.charAt(0) === '/') {
        return (
            <Link to={redirectUrl} className='redirect-link'>
                <CustomNavbarBase {...restProps} onClick={(e) => e.stopPropagation()}/>
            </Link>
        )
    }

    return (
        <CustomNavbarBase 
            {...restProps} 
            onClick={(e) => window.location.assign(redirectUrl)} 
        />
    )
}

export default RedirectNavbarElement;