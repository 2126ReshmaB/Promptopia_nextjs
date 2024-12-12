'use client';

import { Suspense } from 'react';
import EditPrompt from '../../components/EditPrompt';

const EditPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
};

export default EditPage;