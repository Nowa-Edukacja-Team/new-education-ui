import "./styles.scss";

import React from "react";
import { Fragment } from "react/index";
import { ExpandMore } from "@material-ui/icons";
import NavDropdown from "react-bootstrap/NavDropdown";

import CustomButton, {
    IconPosition,
} from "../../../forms/inputs/buttons/button";
import { Action } from "../../types";
import { useLocalization } from "../../../../contexts/localization";
import MenuActionItem from "./item";
import { useGridActions, useGridSelectionState, useShowAsMenu } from "./hooks";
import { handleActionClick } from "./utils";

interface TableManagementActionsProps {
    actions: Action[];
}

const TableManagementUnwrappedActions = (props: TableManagementActionsProps) => {
    const { actions } = props;
    const { type, selectedRows } = useGridSelectionState();

    const handleClick = (event: React.MouseEvent, action: Action) => {
        event.preventDefault();
        handleActionClick(action, selectedRows, type);
    };

    return (
        <Fragment>
            {actions.map((action, index) => (
                <div className="action" key={index}>
                    <CustomButton
                        text={action.label}
                        icon={action.icon}
                        iconPosition={IconPosition.LEFT}
                        onClick={(e) => handleClick(e, action)}
                    />
                </div>
            ))}
        </Fragment>
    );
};

const TableManagementWrappedActions = (props: TableManagementActionsProps) => {
    const { actions } = props;
    const { translate } = useLocalization("tables.management");

    return (
        <NavDropdown
            id="moreActionsButton"
            className="moreActionsDropDown"
            title={
                <CustomButton
                    text={translate(`more-actions`)}
                    icon={<ExpandMore />}
                    iconPosition={IconPosition.RIGHT}
                />
            }
            alignRight
            onClick={(e) => e.stopPropagation()}
        >
            {actions.map((action, index) => (
                <MenuActionItem key={index} {...action} />
            ))}
        </NavDropdown>
    );
};

const TableManagementActions = (props: TableManagementActionsProps) => {
    const { containerRef, showAsMenu } = useShowAsMenu();
    const currentActions = useGridActions(props.actions);

    return (
        <div
            ref={containerRef}
            className="actions-container d-flex justify-content-end"
        >
            {showAsMenu ? (
                <TableManagementWrappedActions actions={currentActions} />
            ) : (
                <TableManagementUnwrappedActions actions={currentActions} />
            )}
        </div>
    );
};

export default TableManagementActions;
