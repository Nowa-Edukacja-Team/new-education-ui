import React from 'react';
import { useParams } from 'react-router-dom';
import { withWizardConfigurationContext } from '../../../contexts/wizardView/context';
import { useUpdateWizardConfiguration } from '../../../contexts/wizardView/hooks';
import { UpdateWizardConfiguration } from './types';
import Wizard from './wizard';

interface Props<T> {
    id: number;
    isEmbedded?: boolean;
    configuration: UpdateWizardConfiguration<T>;
}

const WizardViewInner = (props: Props<any>) => {
    const { isEmbedded, configuration, id } = props;
    return (
        <Wizard config={configuration.config(id)} isEmbedded={isEmbedded} />
    )
};

const UpdateWizardView = (props: any) => {
    const { objectType, id } = useParams<{objectType: string, id: string}>();
    const isAsNumber = (id as unknown) as number;
    const configuration = useUpdateWizardConfiguration(objectType);

    if(!configuration) {
        return (<div>No configuration for: {objectType} :(</div>);
    }

    return <WizardViewInner isEmbedded={false} configuration={configuration} id={isAsNumber} />
}

interface EmbeddedProps<T> {
    id: number;
    configuration: UpdateWizardConfiguration<T>;
}

export const EmbeddedUpdateWizard = <T, >(props: EmbeddedProps<T>) => {
    const { configuration, id } = props;
    return <WizardViewInner isEmbedded={true} configuration={configuration} id={id} />
}

export default withWizardConfigurationContext(UpdateWizardView);