import * as React from 'react';
import classNames from 'classnames';
import { createStyles, WithStyles, Theme, withStyles } from '@material-ui/core';

interface ContainerProps {
    className?: any,
    style?: any,
    children?: any,
    id?: string,
    paddingBottom?: boolean
}

type Props = ContainerProps & WithStyles<typeof styles>;

const Container = ({id, className, style, classes, children, paddingBottom }: Props) => (
    <div id={id} className={classNames(classes.root, className, paddingBottom ? classes.paddingBottom : {})}>
        {children}
    </div>
);

const styles = (theme: Theme) => createStyles({
    root: {
        padding: '32px 16px 56px 16px',
        width: '100%',
        position: 'relative',
        flex: '1 1 auto',
        '&.fluid': {
            maxWidth: 'unset',
        },
        [theme.breakpoints.up('sm')]: {
            padding: '48px 32px 64px 32px',
        },
        [theme.breakpoints.up('md')]: {
            padding: '64px 64px 80px 64px',
        },
        [theme.breakpoints.up(1408)]: {
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paddingBottom: {
        paddingBottom: 108,
    },
});

export default withStyles(styles)(Container);