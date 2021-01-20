import { Fragment } from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';
import useEventListener from '../../../../hooks/eventListener';

import './styles.scss';

interface DropdownItemProps {
    href?: string;
    target?: boolean | string;
    rel?: boolean | string;
    disabled?: boolean;
}

interface CustomDropdownItemProps<T> {
    label: string | React.ReactNode;
    iconUrl: string;
    disabledHint?: string;
    onClick?: (payload: T) => void;
    keepOpenOnClick?: boolean;
};

export type CustomNavbarItemProps<T> = DropdownItemProps & CustomDropdownItemProps<T>;

const preventClick = (event: any) => {
    event.stopImmediatePropagation();
    console.log(event);
};

const CustomNavbarBase = (props: CustomNavbarItemProps<any>) => {
    const { iconUrl, label, disabledHint, onClick, keepOpenOnClick, ...dropItemProps } = props;
    const { disabled, href, target, rel } = dropItemProps;
    const finalDropitemProps = { disabled, href, target, rel };
    const objectRef = useEventListener({
        type: 'click', 
        func: preventClick, 
        condition: keepOpenOnClick,
        onClick: onClick,
    });

    return (
        <NavDropdown.Item {...finalDropitemProps} ref={objectRef} onClick={onClick} >
            <Fragment>
                <span className='item--container'>
                    {label}
                    <img className='icon' src={iconUrl} alt='item-icon' />    
                </span>
                { disabled && disabledHint && <span className='hint'>{disabledHint}</span> }
            </Fragment>
        </NavDropdown.Item>
    )
};

export default CustomNavbarBase;