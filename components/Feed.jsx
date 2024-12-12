'use client'

import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';
import { useRouter } from 'next/navigation';

const PromptCardList = ({data, handleTagClick}) => {

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => 
    <PromptCard 
      key={post._id}
      post={post}
      handleTagClick={handleTagClick}
      />)}
    </div>
  )
}

const Feed = () => {

  const router = useRouter();
  const [searchText,setSearchText] = useState("");
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  },[])

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      router.push(`/search-prompt?tag=${encodeURIComponent(searchText)}`);
    }
  }
  
  return (
    <section className="feed">
      <form className='relative w-full flex-center' onSubmit={handleSearch}>
        <input 
        type='text'
        placeholder="search for a tag"
        onChange={(e) => setSearchText(e.target.value)}
        required
        className="search_input peer"
        />
        <button className='px-3 py-2 ml-2 text-white bg-blue-500 rounded'>Search</button>
      </form>

      <PromptCardList
       data={posts}
       handleTagClick={() => {}}
       />
    </section>
  )
}

export default Feed