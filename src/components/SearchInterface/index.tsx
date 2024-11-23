'use client';

import React, { useState, useEffect } from 'react';
import { InstantSearchNext } from 'react-instantsearch-nextjs';

import { searchClient } from '@/utils';
import { Search } from '../layout';
import { Configure, useInstantSearch } from 'react-instantsearch';

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
          createURL({ qsModule, routeState, location }) {
            const indexUiState = routeState[indexName] || {};
            const basePath = `${location.protocol}//${location.host}${location.pathname}`;

            const queryParameters: any = {};
            if (indexUiState.query) {
              queryParameters.query = encodeURIComponent(indexUiState.query);
            }

            const refinementLists = indexUiState.refinementList ?? {};
            if (refinementLists['Area.Name']) {
              queryParameters.areas =
                refinementLists['Area.Name'].map(encodeURIComponent);
            }

            if (refinementLists['Tags.Name']) {
              queryParameters.tags =
                refinementLists['Tags.Name'].map(encodeURIComponent);
            }

            if (indexUiState.page !== undefined && indexUiState.page !== 1) {
              queryParameters.page = encodeURIComponent(indexUiState.page);
            }

            const queryString = qsModule.stringify(queryParameters, {
              addQueryPrefix: true,
              arrayFormat: 'comma',
            });

            return `${basePath}${queryString}`;
          },
          parseURL({ qsModule, location }) {
            const queryParameters = qsModule.parse(location.search.slice(1));

            const query = queryParameters.query
              ? String(queryParameters.query)
              : '';
            const areas = queryParameters.areas
              ? String(queryParameters.areas).split(',')
              : [];
            const tags = queryParameters.tags
              ? String(queryParameters.tags).split(',')
              : [];
            const page = queryParameters.page
              ? Number(queryParameters.page)
              : 1;

            return {
              [indexName]: {
                query: query,
                page: page,
                refinementList: {
                  'Area.Name': areas,
                  'Tags.Name': tags,
                },
              },
            };
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
