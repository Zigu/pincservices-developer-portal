import {default as DrawerUI} from '@material-ui/core/Drawer';
import styled from '@material-ui/core/styles/styled';

export const Drawer = styled(DrawerUI)({
    '& [class*=MuiDrawer-paperAnchorRight-]': {
        width: '25%',
        padding: '24px',
    },
});
