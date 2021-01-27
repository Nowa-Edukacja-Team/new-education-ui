import "./styles.scss";

import { Field, FormikProps } from "formik";
import React, { useState } from "react";
import {
    ModuleEntity,
    StudyProgramEntity,
} from "../../../../configs/objects/studyProgram/types";
import { useLocalization } from "../../../../contexts/localization";
import { FieldProps } from "../../wizards/types";
import SearchBox, { SearchBoxProps } from "../searchBox";

export interface StudyProgramModuleFieldProps extends FieldProps {
    studyProgramProps?: SearchBoxProps<StudyProgramEntity>;
    moduleProps?: SearchBoxProps<ModuleEntity>;
}

const StudyProgramModuleField = (props: StudyProgramModuleFieldProps) => {
    const { studyProgramProps, moduleProps } = props;
    const { translate } = useLocalization();
    const [studyProgramId, setStudyProgramId] = useState<number | null>(null);

    const handleStudyProgramChange = (
        e: StudyProgramEntity | null,
        form?: FormikProps<any>
    ) => {
        if (e === null) {
            setStudyProgramId(null);
            form?.setFieldValue("module", null);
        } else {
            setStudyProgramId(e.id);
        }
    };

    return (
        <div className="studyProgramModule">
            <SearchBox
                {...studyProgramProps}
                label={translate("objects.StudyProgram.name")}
                name={"studyProgram"}
                onBlur={() => {}}
                // label={'test'}
                fetchOptions={async (text: string) => {
                    return [
                        {
                            id: 1,
                            fieldOfStudy: { name: "Test" },
                        } as StudyProgramEntity,
                    ];
                }}
                getOptionLabel={(studyProgram: StudyProgramEntity) => {
                    const { fieldOfStudy } = studyProgram;
                    return `${fieldOfStudy?.name}`;
                }}
                onSelectionChange={handleStudyProgramChange}
            />
            {studyProgramId !== undefined && studyProgramId !== null ? (
                <SearchBox
                    {...moduleProps}
                    label={translate(
                        "objects.StudyProgram.fields.modules.single"
                    )}
                    name="module"
                    // label={'test'}
                    // clearValue={studyProgramId === undefined || studyProgramId === null}
                    disabled={
                        studyProgramId === undefined || studyProgramId === null
                    }
                    onBlur={() => {}}
                    fetchOptions={async (text: string) => {
                        return [{ id: 1, name: "Test" }].filter((val) =>
                            val.name.includes(text)
                        );
                    }}
                    getOptionLabel={(module: ModuleEntity) => module.name}
                />
            ) : null}
        </div>
    );
};

export default StudyProgramModuleField;
