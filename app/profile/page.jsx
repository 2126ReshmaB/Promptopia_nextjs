'use client'

import {useState,useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Profile from '../../components/Profile';

const MyProfile = () => {


  const handleEdit = () => {

  }
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  },[])
  console.log(posts);
 

  return (
    <Profile 
        name="my"
        desc="Welcome to your personalized profile page"
        data={posts}
        setData={setPosts}
    />
  )
}

export default MyProfile