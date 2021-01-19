import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useLocalization } from '../../contexts/localization/hooks';
import { Languages } from '../../contexts/localization/languages';
import CustomNavbar from './customNavbar/navbar';
import LanguagesSelectorItem from './customNavbar/navbarItems/languages';
import RedirectNavbarElement from './customNavbar/navbarItems/redirect';

const Topbar = (props: any) => {
    const { translate, state } = useLocalization();

    const { selectedLanguage } = state;

    return (
        <Navbar bg='light' expand='md'>
            <Navbar.Brand>{translate('university.name')}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <CustomNavbar>
                <RedirectNavbarElement label={translate('topbar.settings')} iconUrl='/resources/common/settings.svg' redirectUrl='/' disabledHint={translate('topbar.notAvailableYet')} disabled />
                <LanguagesSelectorItem label={'test'} iconUrl='test' />
                <RedirectNavbarElement label={translate('topbar.logout')} iconUrl='/resources/common/logout.svg' redirectUrl='/' disabledHint={translate('topbar.notAvailableYet')} disabled />
            </CustomNavbar>
        </Navbar>
    )
}

export default Topbar;