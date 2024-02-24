import {BackstageTheme} from '@backstage/theme';
import { default as CardUI } from '@material-ui/core/Card';
import { default as ChipUI } from '@material-ui/core/Chip';
import styled from '@material-ui/core/styles/styled';
import Typography from '@material-ui/core/Typography';

export const Card = styled(CardUI)({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 16,
    backgroundColor: 'rgb(242, 242, 242)',
});

export const CardText = styled(Typography)({
    color: '#101419',
});

type ChipColorStyles = {
    [x: string]: string;
};

export const Chip = styled(ChipUI)(
    ({ theme, label }: { theme: BackstageTheme; label: string }) => {
        const type = label.split(':')[0];

        const colorForViolation: ChipColorStyles = {
            must: theme.palette.error.main,
            should: theme.palette.warning.dark,
            may: theme.palette.success.main,
        };

        return {
            border: `1px solid ${colorForViolation[type]}`,
            color: '#212121',
            backgroundColor: '#fff',
            textTransform: 'capitalize',
            fontSize: '12px',
        };
    },
);
