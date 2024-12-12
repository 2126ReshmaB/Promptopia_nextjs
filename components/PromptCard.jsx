'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick }) => {

  const [copied,setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""),3000);
  }
  console.log(copied);

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image || '/assets/images/logo.svg'}
            width={37}
            height={37}
            className='rounded-full'
            alt='profile'
          />

          <div className="flex flex-col copy_bt">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.prompt}</h3>
            <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)} >{post.tag}</p>
          </div>

          <div className='copy_btn' onClick={() => {handleCopy()}}>
            <Image
                src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                width={20}
                height={20}
                alt="copy_button"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default PromptCard