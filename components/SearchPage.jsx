'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchPage = () => {
  const searchParams = useSearchParams(); // Client-side query param handling
  const tag = searchParams?.get('tag'); // Safely retrieve the 'tag' query parameter

  const [posts, setPosts] = useState([]); // State to store filtered posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (tag) {
      const fetchPosts = async () => {
        try {
          const response = await fetch('/api/prompt'); // Fetch all posts
          if (!response.ok) throw new Error('Failed to fetch posts');
          
          const data = await response.json();
          const filteredPosts = data.filter((post) => post.tag === tag); // Filter by tag
          setPosts(filteredPosts); // Update state with filtered posts
        } catch (err) {
          setError(err.message); // Handle errors
        } finally {
          setLoading(false); // Turn off loading state
        }
      };

      fetchPosts();
    }
  }, [tag]); // Re-run effect whenever 'tag' changes

  if (loading) return <p>Loading...</p>; // Display a loading state
  if (error) return <p>Error: {error}</p>; // Display error state

  return (
    <section>
      <h1 className="head_text text-left blue_gradient">Search Results</h1>
      <h1 className="text-xl font-bold py-5">
        Posts with tag: <span className="text-blue-500 px-3">{tag}</span>
      </h1>
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

export default SearchPage;