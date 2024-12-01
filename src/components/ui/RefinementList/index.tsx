'use client';

import styles from './RefinementList.module.css';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { UseRefinementListProps, useRefinementList } from 'react-instantsearch';

type RefinementListProps = UseRefinementListProps & {
  boxTitle: string;
};

export default function RefinementList({
  boxTitle,
  ...props
}: RefinementListProps) {
  const { items, refine } = useRefinementList(props);

  return (
    <div>
      <Typography className={styles['box-title']} variant="h4" gutterBottom>
        {boxTitle}
      </Typography>
      <List className={styles.checkboxes}>
        {items.map((item) => {
          const labelId = `checkbox-list-label-${item.value}`;

          return (
            <ListItem
              key={item.value}
              secondaryAction={<Typography>{item.count}</Typography>}
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={() => refine(item.value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={item.isRefined}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
