import Generate from '@/src/common/components/Generate/Generate';
import List from '@/src/common/components/List/List';
import TopBar from '@/src/common/components/TopBar/TopBar';

const Top = () => {
  return (
    <div className='flex flex-col h-screen'>
      <div>
        <TopBar />
      </div>
      <div className='w-screen flex flex-col items-center h-24'>
        <Generate />
      </div>
      <div>
        <List />
      </div>
    </div>
  )
}

export default Top;