import React from 'react'
import { ROUTE_CONTACT, ROUTE_ROOT } from 'utils/constants'


function HeaderMenu() {
  return (
    <div className={`w-full flex h-64 `}>
        <nav className='flex flex-row gap-2 items-center'>
            <div className=''>
                <a href={ROUTE_ROOT}>Home</a>
            </div>
            <div className=''>
                <a href={ROUTE_CONTACT}>Contact</a>
            </div>
        </nav>
    </div>
  )
}

export default HeaderMenu