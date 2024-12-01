'use client';

import styles from './ListingHits.module.css';
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { SellOutlined as SellOutlinedIcon } from '@mui/icons-material';

import { Snippet, useHits, UseHitsProps } from 'react-instantsearch';
import { ImageWithFallback } from '@/components/common';

export default function ListingHits(props: UseHitsProps<DocumentProps>) {
  const { items } = useHits(props);

  return (
    <Stack>
      {items.map((hit) => (
        <Card key={hit.objectID} className={styles.card}>
          <Box className={styles['content-wrapper']}>
            <CardContent>
              <Box className={styles.toolbar}>
                <Box className={styles.category} component="span">
                  {hit.Area.Name}
                </Box>
                <Typography className={styles.date} variant="body2">
                  {hit.Date}
                </Typography>
              </Box>
              <Typography className={styles.title} variant="h5" gutterBottom>
                {hit.Title}
              </Typography>
              <Snippet hit={hit} attribute="Content" />
            </CardContent>
            <Box className={styles['card-footer']}>
              <Box className={styles.authors}>
                <AvatarGroup max={3}>
                  {hit.Authors.map((author, index) => (
                    <Avatar
                      key={index}
                      alt={`${author.FirstName} ${author.LastName}`}
                      src={
                        author.Avatar
                          ? author.Avatar.url
                          : '/images/placeholder.jpg'
                      }
                    />
                  ))}
                </AvatarGroup>
                <Typography variant="caption">
                  {hit.Authors.map(
                    (author) => `${author.FirstName} ${author.LastName}`,
                  ).join(', ')}
                </Typography>
              </Box>
              <Box className={styles.tags}>
                <SellOutlinedIcon fontSize="small" />
                {hit.Tags.map((tag, index) => (
                  <Box key={index} className={styles.tag} component="span">
                    {tag.Name}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <ImageWithFallback {...hit.Thumbnail} />
        </Card>
      ))}
    </Stack>
  );
}
