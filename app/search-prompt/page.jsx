'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchPrompt = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag'); // Retrieve the 'tag' query parameter

  const [posts, setPosts] = useState([]); // State to store filtered posts

  useEffect(() => {
    if (tag) {
      const fetchPosts = async () => {
        const response = await fetch('/api/prompt'); // Fetch all posts
        const data = await response.json();
        const filteredPosts = data.filter((post) => post.tag === tag); // Filter by tag
        setPosts(filteredPosts); // Update state with filtered posts
      };

      fetchPosts();
    }
  }, [tag]); // Run effect whenever 'tag' changes

  return (
    <section>
      <h1 className='head_text text-left blue_gradient'>Search Results</h1>
      <h1 className="text-xl font-bold py-5">Posts with tag: 
        <span className='text-blue-500 px-3'>{tag}</span></h1>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="border p-4 my-2 rounded bg-gray-300">
              <h2 className="text-lg font-semibold">{post.prompt}</h2>
            </div>
          ))
        ) : (
          <p>No posts found for the tag {tag}.</p>
        )}
      </div>
    </section>
  );
};

export default SearchPrompt;
