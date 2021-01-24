import React from 'react';
import { useParams } from 'react-router-dom';
import { withWizardConfigurationContext } from '../../../contexts/wizardView/context';
import { useWizardConfiguration } from '../../../contexts/wizardView/hooks';
import { WizardType } from '../../../contexts/wizardView/types';
import { WizardConfiguration } from './types';
import Wizard from './wizard';

interface Props<T> {
    isEmbedded?: boolean;
    configuration: WizardConfiguration<T>;
}

const WizardViewInner = (props: Props<any>) => {
    const { isEmbedded, configuration } = props;
    return (
        <Wizard config={configuration} isEmbedded={isEmbedded} />
    )
};

const CreateWizardView = (props: any) => {
    const { objectType } = useParams<{objectType: string}>();
    const configuration = useWizardConfiguration(WizardType.CREATE, objectType);

    if(!configuration) {
        return (<div>No configuration for: {objectType} :(</div>);
    }

    return <WizardViewInner isEmbedded={false} configuration={configuration} />
}

interface EmbeddedProps<T> {
    configuration: WizardConfiguration<T>;
}

export const EmbeddedWizardView = <T, >(props: EmbeddedProps<T>) => {
    const { configuration } = props;
    return <WizardViewInner isEmbedded={true} configuration={configuration} />
}

export default withWizardConfigurationContext(CreateWizardView);