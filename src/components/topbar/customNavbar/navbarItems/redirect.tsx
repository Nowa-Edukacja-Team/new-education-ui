
import React from 'react';
import CustomNavbarBase, { CustomNavbarItemProps } from '../../../forms/inputs/dropdownItem/item';

export interface RedirectNavbarItemProps extends CustomNavbarItemProps<void> {
    redirectUrl: string;
    shouldOpenNewPage?: boolean;
}

const RedirectNavbarElement = (props: RedirectNavbarItemProps) => {
    const { redirectUrl, shouldOpenNewPage } = props;

    return <CustomNavbarBase href={redirectUrl} target={shouldOpenNewPage && '_blank'} rel={shouldOpenNewPage && 'noopener noreferrer'} {...props} />
}

export default RedirectNavbarElement;