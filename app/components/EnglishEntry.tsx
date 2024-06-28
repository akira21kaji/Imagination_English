'use client'

import { useWordsContext } from '@/src/lib/words/wordsContext';
import { OpenAI } from 'openai'
import React, { useState } from 'react'

// type generateExplanation = {
//   explanation: string;
//   inJapanese: string;
//   example: string;
// }

const prompt = `
※上記単語を以下に沿って返答してください※

##依頼内容
入力された「英単語」を「返答内容」に沿って順不同で返答してください。
その際に「制約条件」を必ず漏らさず守るようにしてください。
英単語がエラーの場合は、「##エラー時の返答」に必ず従い、「##制約条件」は無視をしてください。

##返答内容
1. 英単語を英語で説明
2. 英語の説明文を日本語に訳す
3. 英単語の事例の紹介
上記の順番で返答し、以下のようにjson形式で返答をしてください。
entryWords: //こちらは入力された英単語を表示してください
explanation:
inJapanese:
example:

##制約条件
- 英単語の綴りが間違っている場合は、日本語で指摘し、「返答内容」に沿わずに返答してください
- 英単語を英語で説明する際は、入力された英単語を使わずに「This word is」という形で返答
- 返答する文章は簡潔かつ簡単な英単語を使い、１つのセンテンスに収まるようにすること
- もし英単語の綴りが間違えていた場合は、以下条件に必ず漏らさず従い、返答してください

##エラー時の返答
英単語の綴りが間違っている、二文字入力されているなど条件にあわない場合は、
json形式は無視して、近しい英単語を返答してください。
`;


const EnglishEntry = () => {
  const {inputWord, setInputWord, generateExplanation, setGenerateExplanation} = useWordsContext() || {};
  
  const openAi = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  
  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const gptResponse = await openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: inputWord + prompt}],
      })
  
      const getExplanation = gptResponse?.choices?.[0]?.message?.content ?? '';
      if(setInputWord) setInputWord('');
      if(setGenerateExplanation) setGenerateExplanation(getExplanation);
  
    } catch (error) {
      console.error("Error generating explanation:", error);
    }
  }
  
  return (
    <>
      <form className='flex flex-col bg-neutral-800 p-4 rounded-lg items-center w-3/5' id='english-form'>
        <h1 className='text-white text-center text-2xl font-bold m-4'>Enter the English words</h1>
        <input 
          type="text" 
          placeholder='Enter English here' 
          className='bg-transparent border-b border-neutral-600 p-1 mt-2 mb-2 text-white w-3/5'
          onChange={(e) => setInputWord?.(e.target.value)}
          value={inputWord}
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              handleGenerate(e as unknown as React.FormEvent<HTMLFormElement>);
            }
          }}
          />
          <button className='bg-neutral-600 p-1 rounded-md mt-2 text-white' onClick={(e) => handleGenerate(e as unknown as React.FormEvent<HTMLFormElement>)}>Generate</button>
      </form>
      <div className='bg-neutral-600 p-4 rounded-lg m-4 w-3/5'>
        <p className='text-white text-center'></p>
        <p className='text-white text-center'>
          {generateExplanation ? generateExplanation : 'not here'}
        </p>
      </div>
    </>
  )
}

export default EnglishEntry