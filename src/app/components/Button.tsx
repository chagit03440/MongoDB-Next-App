import Link from 'next/link'
import React from 'react'

interface ButtonLinkProps
{
  href:string;
  text:string;
}
const ButtonLink: React.FC<ButtonLinkProps> = ({text, href}) => {
  return (
     <Link className='text-blue-400 rounded' href={href}>
      <button>
        {text}
      </button>
     </Link>
  )
}

export default ButtonLink
