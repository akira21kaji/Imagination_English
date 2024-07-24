'use client'

import { useWordsContext } from '@/src/lib/words/wordsContext';
import { useEffect } from 'react';

const EnglishEntry = () => {
  const {inputWord, setInputWord, generateExplanation, setGenerateExplanation} = useWordsContext() || {};
  
  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('check handler')
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
    // console.log(responseData);
    // console.log('gpt response' , responseData.body);
    if(responseData.status === 200){
      if(setGenerateExplanation) {
        setGenerateExplanation(responseData.body);
      }
      if(setInputWord) {
        setInputWord('');
      }
    }
  }
  
  useEffect(() => {
    const sendFirebase = async () => {
      console.log('generateExplanation', generateExplanation);

      if(!generateExplanation) {
        console.log('generateExplanation is not defined');
        return;
      }
      
      const firebaseResponse = await fetch('api/firebase',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          generateExplanation,
        }),
      });

      if(!firebaseResponse.ok) { 
        throw new Error('Network response was not ok');
      }

      const firebaseResponseData = await firebaseResponse.json();
      console.log(firebaseResponseData);
    }
    if(generateExplanation) {
      sendFirebase();
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
            className='bg-neutral-600 p-1 rounded-md mt-2 text-white' 
            type='submit'
            >
            Generate
          </button>
      </form>
      <div className='bg-neutral-600 p-4 rounded-lg m-4 w-3/5'>
        <p className='text-white text-center'>
          {generateExplanation ? generateExplanation : '英単語を入力してください'}
        </p>
      </div>
    </>

)
}

export default EnglishEntry