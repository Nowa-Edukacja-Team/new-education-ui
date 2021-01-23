import Navbar from 'react-bootstrap/Navbar';

import { useLocalization } from '../../contexts/localization/hooks';
import CustomNavbar from './customNavbar/navbar';
import LanguagesSelectorItem from './customNavbar/navbarItems/languages';
import RedirectNavbarElement from './customNavbar/navbarItems/redirect';

export const Topbar = () => {
    const { translate } = useLocalization();

    return (
        <Navbar bg='light' expand='md'>
            <Navbar.Brand>{translate('app.name')}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <CustomNavbar>
                <RedirectNavbarElement label={translate('topbar.settings')} iconUrl='/resources/common/settings.svg' redirectUrl='/settings' disabledHint={translate('topbar.notAvailableYet')} disabled />
                <LanguagesSelectorItem />
                <RedirectNavbarElement label={translate('topbar.open_keycloak')} iconUrl='/resources/common/keycloak.svg' redirectUrl='/' disabledHint={translate('topbar.notAvailableYet')} disabled />
                <RedirectNavbarElement label={translate('topbar.logout')} iconUrl='/resources/common/logout.svg' redirectUrl='/' disabledHint={translate('topbar.notAvailableYet')} disabled />
            </CustomNavbar>
        </Navbar>
    )
};