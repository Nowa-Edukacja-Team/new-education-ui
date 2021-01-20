import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

import { useUserData } from '../../../contexts/auth';

import './styles.scss';

const CustomNavbar = (props: any) => {
    const { userData } = useUserData();
    const { children } = props;

    return (
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="justify-content-end">
                <Col className='column'>
                    <Image id='avatar' className='avatar' src={`https://eu.ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}`} roundedCircle fluid />
                </Col>
                <NavDropdown className='dropDown' title={`${userData.firstName} ${userData.lastName}`} id="basic-nav-dropdown" alignRight>
                    {children}
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    )
};

export default CustomNavbar;