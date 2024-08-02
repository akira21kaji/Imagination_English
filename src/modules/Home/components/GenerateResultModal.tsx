'use client'

import { useWordsContext } from '@/src/lib/words/wordsContext';
import Image from 'next/image';
import React, { useState } from 'react'

const GenerateResultModal = ({setIsModalOpen}: {setIsModalOpen: (isModalOpen: boolean) => void}) => {
  const [isSaving, setIsSaving] = useState(false);
  const {generateExplanation, setGenerateExplanation} = useWordsContext() || {};

  const handleSaveToFirebase = async () => {
    if(!generateExplanation || isSaving) {
      console.log('generateExplanation is not defined');
      return;
    }
    setIsSaving(true);

    try {
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

        console.log('データが正常に保存されました');
        setIsModalOpen(false);
    } catch (error) {
      console.log('データの保存に失敗しました',error);
    } finally {
      setIsSaving(false);
    }    
  }

  return (
    <div className='absolute flex flex-col p-1em bg-neutral-600 rounded-lg'>
        {typeof generateExplanation === "string" ? (
          "error" in JSON.parse(generateExplanation) ? (
              <p className='text-white text-center'>
                {JSON.parse(generateExplanation).error}
              </p>
            ) : (
              <div className='flex flex-col justify-center items-center '>
                <ul className='text-white text-left'>
                  <li>
                    inputWord: {JSON.parse(generateExplanation).inputWord}
                  </li>
                  <li>
                    inJapanese: {JSON.parse(generateExplanation).inJapanese}
                  </li>
                  <li>
                    example: {JSON.parse(generateExplanation).example}
                  </li>
                </ul>
                <Image src={JSON.parse(generateExplanation).imageUrl} alt='image' width={100} height={100}/>
              </div>
            )
          ) : null}
        <div className='flex justify-center gap-3 mt-5'>
          <button
          onClick={handleSaveToFirebase} 
          disabled={!generateExplanation || isSaving}
          className='bg-neutral-700 w-1/5 p-2 rounded-md m-2 text-white hover:bg-neutral-800 justify-self-end'
          >
            保存
          </button>
          <button
            className='bg-neutral-700 w-1/5 p-2 rounded-md m-2 text-white hover:bg-neutral-800 justify-self-end'
            onClick={() => setIsModalOpen?.(false)}
            >
              閉じる
          </button>
          <button
            className='bg-neutral-700 w-1/5 p-2 rounded-md m-2 text-white hover:bg-neutral-800 justify-self-end'
            >
              再度生成する
            </button>
        </div>
    </div>
  )
}

export default GenerateResultModal