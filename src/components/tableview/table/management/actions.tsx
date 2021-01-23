import "./styles.scss";

import React, { useState } from "react";
import { Fragment } from "react/index";
import { ExpandMore } from "@material-ui/icons";
import NavDropdown from "react-bootstrap/NavDropdown";

import CustomButton, {
  IconPosition,
} from "../../../forms/inputs/buttons/iconButton";
import { Action } from "../../types";
import useMutationObserver from "../../../../hooks/mutationObserver";
import { useLocalization } from "../../../../contexts/localization";
import MenuActionItem from "./item";

interface TableManagementActions {
  actions: Action[];
}

const TableManagementUnwrappedActions = (props: TableManagementActions) => {
  const { actions } = props;

  return (
    <Fragment>
      {actions.map((action, index) => (
        <div className="action" key={index}>
          <CustomButton
            text={action.label}
            icon={action.icon}
            iconPosition={IconPosition.LEFT}
          />
        </div>
      ))}
    </Fragment>
  );
};

const TableManagementWrappedActions = (props: TableManagementActions) => {
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

const TableManagementActions = (props: TableManagementActions) => {
  const [showAsMenu, setShowAsMenu] = useState(false);

  const containerRef = useMutationObserver<HTMLDivElement>({
    condition: (obj, document) => document.contains(obj),
    onMutation: (obj, _, document) => {
      const parent = obj.parentElement;
      console.log(parent?.clientWidth, parent?.scrollWidth);
      if (!parent || parent.clientWidth >= parent.scrollWidth) {
        if (showAsMenu) setShowAsMenu(false);
      } else {
        setShowAsMenu(true);
      }
    },
  });

  return (
    <div
      ref={containerRef}
      className="actions-container d-flex justify-content-end"
    >
      {showAsMenu ? (
        <TableManagementWrappedActions {...props} />
      ) : (
        <TableManagementUnwrappedActions {...props} />
      )}
    </div>
  );
};

export default TableManagementActions;
