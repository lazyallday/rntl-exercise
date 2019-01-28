import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

interface OwnProps {
    in?: boolean,
    size?: number,
    color?: string,
    padding?: number | string,
    thickness?: number,
    relative?: boolean,
}

type Props = OwnProps & WithStyles<typeof styles>;

const Spinner = (props: Props) => (
    <div className={classNames(props.classes.wrapper, props.relative ? props.classes.relative : {})}>
        <Fade
            in={props.in ? props.in : true}
            style={{
                transitionDelay: props.in ? '0ms' : '0ms',
            }}
            unmountOnExit
        >
            <CircularProgress 
                style={{ 
                    width: 'auto',
                    height: props.size ? props.size : '100%',
                    padding: props.padding ? props.padding : '',
                    color: props.color ? props.color : '',
                }}
                thickness={props.thickness ? props.thickness : 3.6}
                classes={{
                    svg: props.classes.svg,
                    root: props.classes.spinner,
                }}
                />
        </Fade>
    </div>
);

const styles = (theme: Theme) => createStyles({
    wrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundColor: 'inherit',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    relative: {
        position: 'relative',
    },
    spinner: {
        maxHeight: 40,
    },
    svg: {
        width: '100%',
        height: '100%',
    }
});

export default withStyles(styles)(Spinner);