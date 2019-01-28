import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';


interface LinkButtonProps extends ButtonProps {
    to: string,
    component: any
}

const LinkButton = ({ ...props }: LinkButtonProps) => <Button { ...props}>{props.children}</Button>;

export default LinkButton;