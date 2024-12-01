import React, { useState, useEffect } from 'react';
import styles from './ImageWithFallback.module.css';
import { CardMedia } from '@mui/material';

import Image from 'next/image';
import { getAbsoluteMediaUrl } from '@/utils';

export default function ImageWithFallback(props: ImageProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [props.url]);

  return (
    <CardMedia className={styles['card-media']}>
      <Image
        className={styles.image}
        alt={props.alternativeText ?? 'No Alternative Text'}
        src={error ? '/images/placeholder.jpg' : getAbsoluteMediaUrl(props.url)}
        fill={true}
        onError={(event) => setError(true)}
      />
    </CardMedia>
  );
}
