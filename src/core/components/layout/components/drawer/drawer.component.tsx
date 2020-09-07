import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Link} from '@app/core/components/link/link.component';
import {useStyles} from './drawer.styles';

export interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuItems: {
    url: string;
    key: string;
    title: string;
  }[];
}

const iOS = Boolean(global.navigator) && process.browser && /iPad|iPhone|iPod/.test(global.navigator.userAgent);

export const Drawer = (props: DrawerProps): JSX.Element => {
  const {open, setOpen, menuItems} = props;
  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor='left'
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}>
      <List className={classes.list}>
        {menuItems.map((item) => (
          <Link href={item.url} key={item.key}>
            <ListItem button>
              <ListItemText primary={item.title} />
            </ListItem>
            <Divider className={classes.divider} />
          </Link>
        ))}
      </List>
    </SwipeableDrawer>
  );
};
