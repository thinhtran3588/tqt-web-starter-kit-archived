import React from 'react';
import Link from 'next/link';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useStyles} from './drawer.styles';

export interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuItems: {
    url: string;
    key: string;
    text: string;
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
            <a href={item.url}>
              <ListItem button>
                <ListItemText primary={item.text} />
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
    </SwipeableDrawer>
  );
};
