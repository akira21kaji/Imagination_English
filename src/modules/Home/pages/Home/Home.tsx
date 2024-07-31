import EnglishEntry from './EnglishEntry/EnglishEntry';
import TopBar from './TopBar/TopBar';
import Lists from './Lists/Lists';

const Home = () => {
  return (
    <div>
      <div>
        <TopBar />
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

export default Home;