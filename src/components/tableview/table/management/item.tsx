import React, { Fragment, useState } from "react";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { Tooltip } from "@material-ui/core";

import useMutationObserver from "../../../../hooks/mutationObserver";
import { Action } from "../../types";
import "./styles.scss";

const MenuActionItem = (action: Action) => {
    const [helperText, setHelperText] = useState('');
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

    return (
        <Tooltip title={helperText}>
            <div className="menu-action">
                <NavDropdown.Item>
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
