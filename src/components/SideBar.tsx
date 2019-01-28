import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { updateLanguage, toggleSideBar } from 'actions';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemLink from './ListItemLink';
import ListItemText from '@material-ui/core/ListItemText';
import ExitIcon from '@material-ui/icons/ExitToApp';
import LanguageIcon from '@material-ui/icons/Language';
import ReportIcon from '@material-ui/icons/Assessment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { auth } from 'services/firebase';
import { ViewState, ReduxState } from 'services/types';
import { Languages } from 'common/types';
import { strings } from 'localization';
import { getLanguageNativeName } from 'localization/utils';

interface DispatchProps {
    updateLanguage: (lang: Languages) => void,
    toggleSideBar: () => void
}

interface StateToProps {
    view: ViewState,
    lang: Languages
}

interface State {
    languageExpanded: boolean
}

type Props = DispatchProps & StateToProps & WithStyles<typeof styles> & RouteComponentProps<{}>;

class SideBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            languageExpanded: false,
        };
        this.toggleSideBar = this.toggleSideBar.bind(this);
        this.handleLanguageExpand = this.handleLanguageExpand.bind(this);
    }

    toggleSideBar() {
        this.props.toggleSideBar();
    }

    handleLanguageExpand(e: any) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            languageExpanded: !this.state.languageExpanded,
        });
    }

    setLanguage(lang: Languages) {
        this.setState({
            languageExpanded: false,
        });
        this.props.updateLanguage(lang);
    }

    render() {
        const text = strings.headerBar;
        const classes = this.props.classes;
        const languageExpanded = this.state.languageExpanded;
        return (
            <Drawer open={this.props.view.sideBarOpen} onClose={this.toggleSideBar}>
            <div
                tabIndex={0}
                role="button"
                onClick={this.toggleSideBar}
                onKeyDown={this.toggleSideBar}
            >
                <List component="nav">
                    <ListItemLink button component={Link} to="/reports">
                        <ListItemIcon>
                            <ReportIcon />
                        </ListItemIcon>
                        <ListItemText primary={text.reports} />
                    </ListItemLink>
                    <ListItem button onClick={this.handleLanguageExpand}>
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText
                            inset
                            primary={text.language}
                            secondary={getLanguageNativeName(this.props.lang)}
                            classes={{
                                secondary: classes.capitalize
                            }}
                        />
                        {languageExpanded ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={languageExpanded} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <ListItem button className={classes.nested} onClick={this.setLanguage.bind(this, 'en')}>
                                <ListItemText inset primary={getLanguageNativeName('en')} 
                                    classes={{
                                        primary: classes.capitalize
                                    }}
                                />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={this.setLanguage.bind(this, 'fi')}>
                                <ListItemText inset primary={getLanguageNativeName('fi')}
                                    classes={{
                                        primary: classes.capitalize
                                    }}
                                />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => auth.signOut()}>
                        <ListItemIcon>
                            <ExitIcon />
                        </ListItemIcon> 
                        <ListItemText primary={text.logOut} />
                    </ListItem>
                </List>
            </div>
            </Drawer>
        );
    }
}

const styles = (theme: Theme) => createStyles({
    nested: {
        paddingLeft: theme.spacing.unit * 3,
    },
    capitalize: {
        textTransform: 'capitalize',
    }
});

const mapStateToProps = ({ lang, view }: ReduxState): StateToProps => {
    return { lang, view };
};

const dispatchProps: DispatchProps = {
    updateLanguage,
    toggleSideBar,
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, dispatchProps)(SideBar)));