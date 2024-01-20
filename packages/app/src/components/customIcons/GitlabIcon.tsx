import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    img: {
        height: '30px',
        width: 'auto'
    }
});
export const GitlabIcon = () => {
    const classes = useStyles();
    return <img className={classes.img} src="/icons/icons8/gitlab.svg" alt="Gitlab" />;
};
