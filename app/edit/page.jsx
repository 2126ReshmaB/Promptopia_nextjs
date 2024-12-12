'use client';

import { Suspense } from 'react';
import EditPageContent from '../../components/EditPageContent';

const EditPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPageContent />
    </Suspense>
  );
};

export default EditPage;
