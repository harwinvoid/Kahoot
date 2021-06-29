/*
 * @Author: yanghuayun
 * @Date: 2021-06-29 22:12:37
 * @LastEditors: yanghuayun
 * @LastEditTime: 2021-06-29 22:14:56
 * @Description: file content
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { Omit } from '@material-ui/types';

interface Props {
  color: 'red' | 'blue';
}

const useStyles = makeStyles({
  root: {
    background: (props: Props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props: Props) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
});

const  MyButton = (props: Props & Omit<MuiButtonProps, keyof Props>) => {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

export default MyButton;
