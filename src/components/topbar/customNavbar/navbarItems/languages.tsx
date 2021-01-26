import './styles.scss';

import React, { Fragment } from 'react';

import NavDropdown from 'react-bootstrap/NavDropdown';

import { Language, useLocalization } from '../../../../contexts/localization';
import CustomNavbarBase from '../../../forms/inputs/dropdownItem/item';

const LanguagesSelectorItem = () => {
    const { translate, state, actions } = useLocalization();
    const { selectedLanguage, languages } = state;

    const getLanguageLabel = (language: Language, bold?: boolean) => {
        const label = translate(`languages.${language.name}`)
        return bold ? <b>{label}</b> : label
    }

    const buildLanguageOption = (language: Language) => (
        <CustomNavbarBase
            className='lng-btn-option'
            key={language.code}
            label={getLanguageLabel(language, selectedLanguage.id === language.id)}
            iconUrl={language.flagUrl}
            disabled={selectedLanguage.id === language.id}
            onClick={() => actions.changeLanguage(language.id)}
            keepOpenOnClick={true}
        />
    )

    return (
        <Fragment>
            <NavDropdown.Divider />
            <CustomNavbarBase 
                className='lng-btn-header'
                label={translate('topbar.changeLanguage')} 
                iconUrl={selectedLanguage.flagUrl} 
                disabled 
                disabledHint={`${translate(`topbar.currentLanguage`)}: ${translate(`languages.${selectedLanguage.name}`)}`}
            />
            <div className='lang--options'>
                { languages.map(lang => buildLanguageOption(lang)) }
            </div>
            <NavDropdown.Divider />
        </Fragment>
    )
}

export default LanguagesSelectorItem;