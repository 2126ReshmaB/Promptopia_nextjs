'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const EditPage = () => {
  const searchParams = useSearchParams();

  // Access the query parameters
  const id = searchParams.get('id');
  const prompt = searchParams.get('prompt');
  const tag = searchParams.get('tag');

  const handleSubmit = () => {
    windows.alert(prompt);
  }

  const [newPrompt,setNewPrompt] = useState(prompt);
  console.log(newPrompt);
  return (
    <div>
      <form>
        <input 
        className='px-5 py-3 border rounded'
        type='name'
        value={newPrompt}
        onChange={(e) => setNewPrompt(e.target.value)} />
      </form>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleSubmit()}>
          Update
        </button>
    </div>
  );
};

export default EditPage;
