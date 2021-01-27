import './styles.scss';

import { DetailPageProps } from "../../../../../components/forms/wizards/types";
import { useLocalization } from "../../../../../contexts/localization";
import { useRequestStudyProgram } from '../../../../../hooks/objects/studyProgramHooks';

const StudyProgramMainDetailsPage = (props: DetailPageProps) => {
    const { id } = props;
    const { translate } = useLocalization();
    const program = useRequestStudyProgram(id);
    const { fieldOfStudy, modules, examRanges } = program;

    return (
        <div className='main-details'>
            <div className='details-section'>
                <p className='section-label'>{translate('objects.StudyProgram.details.main.fieldOfStudyInfo')}</p>
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
                <p className='section-label'>{translate('objects.StudyProgram.details.main.examRanges')}</p>
                <div className='section-content'>
                    {
                        examRanges?.map((text, number) => (
                            <div className='section-content-entry'>
                                <div className='label'>{number}</div>
                                <div className='value'>{text}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='details-section'>
                <p className='section-label'>{translate('objects.StudyProgram.details.main.modules')}</p>
                <div className='section-content'>
                    {
                        modules?.map(({ name, ects }, id) => (
                            <div className='section-content-entry'>
                                <div className='label'>{id + 1}</div>
                                <div className='value'>{name}</div>
                                <div className='value'>{ects} ECTS</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default StudyProgramMainDetailsPage;