import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useLocalization } from '../../../../contexts/localization';
import { Languages } from '../../../../contexts/localization/languages';
import { CustomNavbarNavItem, CustomNavbarItemProps } from './item';

const LanguagesSelectorItem = (props: CustomNavbarItemProps<Languages>) => {
    const { translate, state, actions } = useLocalization();
    const { selectedLanguage } = state;

    return (
        <React.Fragment>
            <NavDropdown.Divider />
            <CustomNavbarNavItem 
                label={translate('topbar.changeLanguage')} 
                iconUrl={selectedLanguage.flagUrl} 
                disabled 
                disabledHint={`${translate(`topbar.currentLanguage`)}: ${translate(`languages.${selectedLanguage.name}`)}`}
            />
            <CustomNavbarNavItem 
                label={selectedLanguage.id === Languages.POLISH ? <b>{translate('languages.Polish')}</b>: translate('languages.Polish')} 
                iconUrl='/resources/flags/poland.svg' 
                disabled={selectedLanguage.id === Languages.POLISH} 
                onClick={() => actions.changeLanguage(Languages.POLISH)} 
            />
            <CustomNavbarNavItem 
                label={selectedLanguage.id === Languages.ENGLISH ? <b>{translate('languages.English')}</b>: translate('languages.English')} 
                iconUrl='/resources/flags/united-kingdom.svg' 
                disabled={selectedLanguage.id === Languages.ENGLISH} 
                onClick={() => actions.changeLanguage(Languages.ENGLISH)}
            />
            <NavDropdown.Divider />
        </React.Fragment>
    )
}

export default LanguagesSelectorItem;