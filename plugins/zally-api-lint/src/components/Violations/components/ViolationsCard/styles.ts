import styled from '@material-ui/core/styles/styled';
import {default as ButtonUI} from '@material-ui/core/Button';
import {default as CardUI} from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Link as LinkUI } from '@backstage/core-components';

export const Button = styled(ButtonUI)(({ theme }) => ({
    color: theme.palette.warning.dark,
    fontSize: 16,
    textTransform: 'inherit',
    fontWeight: 400,
    margin: '12px 0',
    paddingRight: 0,
}));

export const Card = styled(CardUI)({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 16,
    backgroundColor: 'rgb(242, 242, 242)',
});

export const CardText = styled(Typography)({
    color: '#101419',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'auto',
});

export const ContentWrapper = styled('div')({
    marginTop: 8,
    borderBottom: '1px solid #10141950',
    padding: 8,
    '&:last-child': {
        borderBottom: 'none',
    },
});

export const Link = styled(LinkUI)({
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'auto',
});

export const DetailsTitle = styled(Typography)({
    color: '#101419',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'auto',
    marginTop: 20,
});
