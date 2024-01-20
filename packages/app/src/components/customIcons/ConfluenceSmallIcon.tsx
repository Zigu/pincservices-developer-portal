import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    img: {
        height: '1em',
        width: 'auto',
    }
});

export const ConfluenceSmallIcon = () => {
    const classes = useStyles();
    return <img className={classes.img} src="/icons/icons8/confluence.svg" alt="Confluence" />;
};
