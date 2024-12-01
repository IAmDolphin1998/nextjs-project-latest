'use client';

import React, { useState } from 'react';
import { InstantSearchNext } from 'react-instantsearch-nextjs';

import { searchClient } from '@/utils';
import { Search } from '../layout';
import { Configure } from 'react-instantsearch';

export default function SearchInterface() {
  const [author, setAuthor] = useState('');

  const indexName = `${process.env.NODE_ENV}_document_index`;

  return (
    <InstantSearchNext
      indexName={indexName}
      searchClient={searchClient}
      routing={{
        router: {
          windowTitle(routeState) {
            const indexUiState = routeState[indexName] || {};
            return indexUiState.query
              ? `UniPaper - Results for: ${indexUiState.query}`
              : 'UniPaper - Results page';
          },
          cleanUrlOnDispose: false,
        },
      }}
      future={{
        preserveSharedStateOnUnmount: false,
      }}
    >
      <Configure
        filters={
          author
            ? `Authors.FirstName:"${author}" OR Authors.LastName:"${author}"`
            : ''
        }
      />
      <Search setAuthor={setAuthor} />
    </InstantSearchNext>
  );
}
