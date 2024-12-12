'use client';

import { Suspense } from 'react';
import SearchPage from '../../components/SearchPage';

const SearchPrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
};

export default SearchPrompt;
