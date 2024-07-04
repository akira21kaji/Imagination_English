import React from 'react'
import Topbar from '../components/Topbar';
import EnglishEntry from '../components/EnglishEntry';
import Lists from '../components/Lists';

const TopPage = () => {
  return (
    <div>
      <div>
        <Topbar />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <EnglishEntry />
      </div>
      <div>
        <Lists />
      </div>
    </div>
  )
}

export default TopPage;
