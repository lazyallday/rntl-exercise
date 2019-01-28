import * as React from 'react';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';


interface ListItemLinkProps extends ListItemProps {
    to: string,
    component: any
}

const ListItemLink = ({ ...props }: ListItemLinkProps) => <ListItem { ...props}>{props.children}</ListItem>;

export default ListItemLink;