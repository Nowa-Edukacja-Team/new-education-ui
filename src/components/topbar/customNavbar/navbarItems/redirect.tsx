import CustomNavbarItem, { CustomNavbarItemProps } from "./item";

import NavDropdown from 'react-bootstrap/NavDropdown';
import './styles.scss';

export interface RedirectNavbarItemProps extends CustomNavbarItemProps<void> {
    redirectUrl: string;
    shouldOpenNewPage?: boolean;
}

const RedirectNavbarElement = (props: RedirectNavbarItemProps) => {
    const { redirectUrl, shouldOpenNewPage, iconUrl, label, disabled, disabledHint } = props;

    return (
        <NavDropdown.Item href={redirectUrl} target={shouldOpenNewPage && '_blank'} rel={shouldOpenNewPage && 'noopener noreferrer'} disabled={disabled}>
            <CustomNavbarItem {...props} />
        </NavDropdown.Item>
    )
}

export default RedirectNavbarElement;