'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Profile = ({ name, desc, data, setData }) => {
  
  const router = useRouter();
  const { data: session} = useSession();

  console.log(session);
  
  const handleDelete = async (id) => {
     try{
      const response = await fetch('/api/delete',{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id}),
      })
      if(response.ok){
        setData((data) => data.filter((datas) => datas._id !== id));
      }
      else{
        console.error("error");
      }

     }
     catch(error){
      console.error("Error deleting item:" ,error);
     }
  }

  const handleEdit = (id) => {
    router.push(`/update-prompt?id=${id}`)
  }
  return (
    <div>
      <h1 className="head_text">
        <span className="blue_gradient">My Profile</span>
      </h1>
    <div className='py-5 flex gap-5'>
      <div>
      <Image
              src={session?.user?.image || '/assets/images/logo.svg'}
              width={55}
              height={55}
              className='rounded-full shadow-lg pt-1 mx-2'
              alt='profile'
            />
      </div>
      <div className='border-none shadow-lg bg-white rounded px-5 py-2'>
      <p>Name: 
        <span className='text-gray-500 pl-2'>{session?.user?.name}</span>
      </p>
      <p>Gmail: 
        <span className='text-gray-500 pl-2'>{session?.user?.email}</span>
      </p>
      </div>
    </div>
    <p className="desc max-w-md">
      You're amazing prompts are here and you can manage it in any case...
      </p>
      <div className="py-5">
        {
          data.map((datas) =>
            <div    key={datas._id} className="border p-4 my-2 rounded bg-gray-300">
              <div className="flex gap-3 pt-2">
              {datas.prompt}
              <div className="cursor-pointer rounded-full border border-black py-1.5 px-2.5" onClick={() => handleDelete(datas._id)}>
              <Image 
              src='/assets/icons/delete.png'
              width={20}
              height={20}
              alt="delete"/>
              </div>
              <div className="cursor-pointer rounded-full border border-black py-1.5 px-2.5" onClick={() => handleEdit(datas._id)}>
              <Image 
              src='/assets/icons/edit.png'
              width={20}
              height={20}
              alt="delete"/>
              </div>
              </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default Profile