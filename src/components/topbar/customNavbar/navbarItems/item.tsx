import React from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';

import './styles.scss';

export interface CustomNavbarItemProps<T> {
    label: string | React.ReactNode;
    iconUrl: string;
    disabled?: boolean;
    disabledHint?: string;
    onClick?: (payload: T) => void;
}

const CustomNavbarItem = (props: CustomNavbarItemProps<any>) => {
    const { iconUrl, label, disabled, disabledHint } = props;

    return (
        <React.Fragment>
            <span className='item--container'>
                {label}
                <img className='icon' src={iconUrl} alt='item-icon' />    
            </span>
            { disabled && disabledHint && <span className='hint'>{disabledHint}</span> }
        </React.Fragment>
    );
}

export const CustomNavbarNavItem = (props: CustomNavbarItemProps<any>) => (
    <NavDropdown.Item disabled={props.disabled} onClick={props.onClick}>
        <CustomNavbarItem {...props} />
    </NavDropdown.Item>
)

export default CustomNavbarItem;