import React from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';

import './styles.scss';

interface DropdownItemProps {
    disabled?: boolean;
    className?: string;
}

interface CustomDropdownItemProps<T> {
    label: string | React.ReactNode;
    iconUrl: string;
    disabledHint?: string;
    onClick?: (payload: T) => void;
    keepOpenOnClick?: boolean;
};

export type CustomNavbarItemProps<T> = DropdownItemProps & CustomDropdownItemProps<T>;

const CustomNavbarBase = (props: CustomNavbarItemProps<any>) => {
    const { iconUrl, label, disabledHint, onClick, keepOpenOnClick, ...dropItemProps } = props;
    const { disabled, className } = dropItemProps;
    const finalDropitemProps = { disabled };

    const handleClick = (e: React.MouseEvent) => {
        if(onClick && e && !disabled) {
            onClick(e);
        }
    }

    return (
        <NavDropdown.ItemText {...finalDropitemProps} onClick={handleClick} className={disabled ? `nav-button disabled` : `nav-button`}>
            <div className={className}>
                <span className='item--container'>
                    {label}
                    <img className='icon' src={iconUrl} alt='item-icon' />    
                </span>
                { disabled && disabledHint && <span className='hint'>{disabledHint}</span> }
            </div>
        </NavDropdown.ItemText>
    )
};

export default CustomNavbarBase;