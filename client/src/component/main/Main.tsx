import React, { ReactElement } from 'react'
import Hot from './Hot'
import Filter from './Filter'
import Discount from './Discount'

const Main : React.FC = () : ReactElement => {
  return (
    <div className='py-10 bg-[#f2f2f2]'>
        <Hot/>
        <Filter/>
        <Discount/>
    </div>
  )
}

export default Main