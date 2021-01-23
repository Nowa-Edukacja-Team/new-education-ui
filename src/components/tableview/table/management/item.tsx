import "./styles.scss";

import React, { Fragment, useState } from "react";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { Tooltip } from "@material-ui/core";

import useMutationObserver from "../../../../hooks/mutationObserver";
import { Action } from "../../types";
import { useGridSelectionState } from "./hooks";
import { handleActionClick } from "./utils";

const MenuActionItem = (action: Action) => {
    const [helperText, setHelperText] = useState('');
    const { type, selectedRows } = useGridSelectionState();

    const textRef = useMutationObserver<HTMLParagraphElement>({
        condition: (obj, document) => document.contains(obj),
        onMutation: (obj, _, document) => {
            if (obj.clientWidth < obj.scrollWidth) {
                setHelperText(action.label);
            } else if (helperText.length > 0) {
                setHelperText('');
            }
        },
    });

    const handleClick = (event: React.MouseEvent<any>) => {
        event.preventDefault();
        handleActionClick(action, selectedRows, type);
    };

    return (
        <Tooltip title={helperText}>
            <div className="menu-action">
                <NavDropdown.Item onClick={(e) => handleClick(e)}>
                    <Fragment>
                        <div className="item--container d-flex justify-content-start">
                            {action.icon}
                            <p ref={textRef}>{action.label}</p>
                        </div>
                    </Fragment>
                </NavDropdown.Item>
            </div>
        </Tooltip>
    );
};

export default MenuActionItem;
