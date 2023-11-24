import React, { ReactElement } from 'react'
import Top from './Top';
import Search from './Search';
import Navbar from './Navbar';
import Info from './Info';
import Translate from './Translate';

const Header = (): ReactElement => {
  return (
    <div className=' bg-[#262626] text-white'>
      <div className="container w-[1200px] mx-auto py-4">
        <Info />
        <Top/>
        <Navbar />
        <Translate/>
        {/* <Search /> */}
      </div>
    </div>
  )
}

export default Header