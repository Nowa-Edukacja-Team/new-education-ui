import './styles.scss';

import { DetailPageProps } from "../../../../../components/forms/wizards/types";
import { useLocalization } from "../../../../../contexts/localization";
import { useRequestStudyPlan } from "../../../../../hooks/objects/studyPlanHooks";

const StudyPlansMainDetailsPage = (props: DetailPageProps) => {
    const { id } = props;
    const { translate } = useLocalization();
    const plan = useRequestStudyPlan(id);
    const { deficits, studyProgram } = plan;
    const fieldOfStudy = studyProgram.fieldOfStudy;

    return (
        <div className='main-details'>
            <div className='details-section'>
                <p className='section-label'>{translate('objects.StudyPlan.details.main.fieldOfStudyInfo')}</p>
                <div className='section-content'>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.FieldOfStudy.name')}</div>
                        <div className='value'>{fieldOfStudy?.name}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.Faculty.name')}</div>
                        <div className='value'>{fieldOfStudy?.faculty.name}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.Language.name')}</div>
                        <div className='value'>{fieldOfStudy?.language.name}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.Mode.name')}</div>
                        <div className='value'>{fieldOfStudy?.mode.name}</div>
                    </div>
                    <div className='section-content-entry'>
                        <div className='label'>{translate('objects.Profile.name')}</div>
                        <div className='value'>{fieldOfStudy?.profile.name}</div>
                    </div>
                </div>
            </div>
            <div className='details-section'>
                <p className='section-label'>{translate('objects.StudyPlan.details.main.allowedDeficits')}</p>
                <div className='section-content'>
                    {
                        deficits.map(({ semester, limit}) => (
                            <div className='section-content-entry'>
                                <div className='label'>{`${translate('objects.StudyPlan.details.main.semester')} ${semester}`}</div>
                                <div className='value'>{limit}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default StudyPlansMainDetailsPage;