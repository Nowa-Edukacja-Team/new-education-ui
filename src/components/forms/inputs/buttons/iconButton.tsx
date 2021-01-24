import './styles.scss';

import { IconButton, IconButtonProps } from '@material-ui/core';

const CLASS_NAME = 'customIconButton';

const CustomIconButton = (props: IconButtonProps) => {
    const { classes } = props;

    return (
        <IconButton 
            {...props}
            classes={{
                ...classes,
                root: classes && classes.root ? `${classes.root} ${CLASS_NAME}` : `${CLASS_NAME}`,
                disabled: classes && classes.disabled ? `${classes.disabled} ${CLASS_NAME}--disabled` : `${CLASS_NAME}--disabled`
            }}
        />
    )
};

export default CustomIconButton;