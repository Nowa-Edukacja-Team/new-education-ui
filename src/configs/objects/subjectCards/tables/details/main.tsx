import './styles.scss';

import { DetailPageProps } from "../../../../../components/forms/wizards/types";
import { useLocalization } from "../../../../../contexts/localization";
import { useRequestSubjectCard } from '../../../../../hooks/objects/subjectCards';

const SubjectCardMainDetailsPage = (props: DetailPageProps) => {
    const { id } = props;
    const { translate } = useLocalization();
    const card = useRequestSubjectCard(id);
    const { 
        name, subjectCode, englishName, 
        isGroup, zzuHours, cnpsHours, 
        subjectECTS, subjectKind, idSupervisor, 
        creditingForm, module, subjectObjective } = card;

    

    return (
        <div className='main-details'>
            <div className='details-section'>
                <p className='section-label'>{translate('objects.SubjectCard.details.main.subjectInfo')}</p>
                <div className='section-content'>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.name')}</div>
                        <div className='value'>{name}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.subjectCode')}</div>
                        <div className='value'>{subjectCode}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.englishName')}</div>
                        <div className='value'>{englishName}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.isGroup.name')}</div>
                        <div className='value'>
                            {isGroup 
                                ? translate('objects.SubjectCard.fields.isGroup.true') 
                                : translate('objects.SubjectCard.fields.isGroup.false')
                            }
                        </div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.zzuHours')}</div>
                        <div className='value'>{zzuHours}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.cnpsHours')}</div>
                        <div className='value'>{cnpsHours}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.subjectECTS')}</div>
                        <div className='value'>{subjectECTS}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.subjectKind')}</div>
                        <div className='value'>{subjectKind.name}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.supervisor')}</div>
                        <div className='value'>{idSupervisor}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.creditingForm')}</div>
                        <div className='value'>{creditingForm.name}</div>
                    </div>
                    {
                        module.blocks && (
                            <div className='section-content-entry'>
                                <div className='label'>{translate('objects.SubjectCard.fields.block')}</div>
                                <div className='value'>{module.blocks.name}</div>
                            </div>
                        )
                    }
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.SubjectCard.fields.module')}</div>
                        <div className='value'>{module.name}</div>
                    </div>
                </div>
            </div>
            <div className='details-section'>
                <p className='section-label'>{translate('objects.SubjectCard.details.main.subjectObjective')}</p>
                <div className='section-content'>
                    {
                        subjectObjective.map((content, id) => (
                            <div className='section-content-entry'>
                                <div className='label study-objective'>{id + 1}. </div>
                                <div className='value study-objective'>{content}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default SubjectCardMainDetailsPage;