import './styles.scss';

import React, { useState, forwardRef, createRef, Fragment } from "react";

import { Button, ButtonProps, Tooltip } from '@material-ui/core';
import useMutationObserver from '../../../../hooks/mutationObserver';

export enum IconPosition {
    LEFT,
    RIGHT,
    NONE
}

interface OwnButtonProps extends Omit<ButtonProps, 'startIcon' | 'endIcon' | 'children' | 'variant'> {
    iconPosition?: IconPosition;
    icon?: React.ReactNode;
    text: string;
}

interface CustomButtonInnerProps extends OwnButtonProps {
    labelRef: React.RefObject<HTMLDivElement>
}

const CustomButtonInner = forwardRef((props: CustomButtonInnerProps, ref: any) => {
    const { iconPosition, icon, text, labelRef, ...rest } = props;

    const getIconPositionProperty = (position: IconPosition, icon?: React.ReactNode) => {
        if(icon === undefined || icon === null || position === IconPosition.NONE) {
            return {}
        }
        return position === IconPosition.RIGHT ? { endIcon: icon } : { startIcon: icon }
    }

    const finalPosition = iconPosition === undefined || iconPosition === null ? IconPosition.NONE : iconPosition;
    const iconProps = getIconPositionProperty(finalPosition, icon);

    return (
        <Button
            ref={ref}
            classes={{
                root: 'customButton-root',
                label: 'customButton-label'
            }}
            variant='outlined'
            {...rest}     
            {...iconProps}
        >
            <div ref={labelRef} className='customButton-p-label'>{ text }</div>
        </Button>
    )
});

const CustomButton = (props: OwnButtonProps) => {
    const [ showTooltip, setShowTooltip ] = useState(false);
    const buttonRef = createRef();
    const { text } = props;

    const labelRef = useMutationObserver<HTMLDivElement>({
        condition: (obj, document) => document.contains(obj),
        onMutation: (obj, _, document) => {
            if(obj.scrollWidth > obj.clientWidth) {
                setShowTooltip(true);
            } else {
                setShowTooltip(false);
            }
        }
    });

    return (
        <Fragment>
            {
                showTooltip ? (
                    <Tooltip title={text} arrow>
                        <CustomButtonInner {...props} labelRef={labelRef} ref={buttonRef} />
                    </Tooltip>
                ) : (
                    <CustomButtonInner {...props} labelRef={labelRef} ref={buttonRef} />
                )
            }
        </Fragment>
    )
};

export default CustomButton;