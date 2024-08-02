'use client'

import { useWordsContext } from '@/src/lib/words/wordsContext';
import { useEffect, useState } from 'react';
import GenerateResultModal from '../../../components/GenerateResultModal';

const EnglishEntry = () => {
  const {inputWord, setInputWord, generateExplanation, setGenerateExplanation} = useWordsContext() || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/gpt',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputWord,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    const responseDataString = JSON.stringify(responseData.body);

    if(responseData.status === 200){
      if(setGenerateExplanation) {
        setGenerateExplanation(responseDataString);
      }
      if(setInputWord) {
        setInputWord('');
      }
    }
  }

  useEffect(() => {
    if(generateExplanation) {
      setIsModalOpen(true);
    }
  },[generateExplanation])
  
  return (
    <>
      <form 
        className='flex flex-col bg-neutral-800 p-4 rounded-lg items-center w-3/5' 
        id='english-form'
        onSubmit={handleGenerate}
        >
        <h1 className='text-white text-center text-2xl font-bold m-4'>Enter the English words</h1>
        <input 
          type="text" 
          placeholder='Enter English here' 
          className='bg-transparent border-b border-neutral-600 p-1 mt-2 mb-2 text-white w-3/5'
          onChange={(e) => setInputWord?.(e.target.value)}
          value={inputWord}
          />
          <button 
            className='bg-neutral-600 w-1/5 p-1 rounded-md mt-2 text-white hover:bg-neutral-700' 
            type='submit'
            >
            Generate
          </button>
      </form>
      {isModalOpen && 
      <div 
        className='flex justify-center items-center h-full w-full bg-black bg-opacity-50'
        >
        <GenerateResultModal setIsModalOpen={setIsModalOpen}/>
      </div>
      }
    </>

)
}

export default EnglishEntry