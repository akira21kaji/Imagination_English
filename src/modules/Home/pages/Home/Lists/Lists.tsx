'use client'

import Image from "next/image";
import { useEffect, useState } from "react"


const Lists = () => {
  const [wordLists, setWordLists] = useState<any[]>([]);
  
  const getWordLists = async () => {
    const res = await fetch(`api/firebase`,{
      method: 'GET'
    })
    const data = await res.json();

    if(data.status === 200) {
      if(setWordLists) {
        setWordLists(data.wordLists);
      }
    }      
  }

  return (
    <>
      <p className="text-center text-white text-2xl font-bold">これまで検索した単語リスト</p>
      <div className="w-full">
        {/* {wordLists.map((item: any, index: number) => (
          <div key={index} className="bg-gray-100 p-2 rounded-md">
            <p className="text-center text-gray-800 text-3xl font-bold">{item.inputWord}</p>
            <p className="text-gray-800 text-md">{item.explanation}</p>
            <p className="text-gray-800 text-md">{item.inJapanese}</p>
            <p className="text-gray-800 text-md">{item.example}</p>
            {"imageUrl" in item ? <Image src={item.imageUrl} alt="画像" width={200} height={200} /> : <p className="text-gray-800 text-md">画像登録なし</p>} */}
        <table className="table-fixed w-full text-white text-left">
          <thead className="text-white text-l border-b-2 border-neutral-300">
            <tr>
              <th>単語</th>
              <th>画像</th>
              <th>英語による説明</th>
              <th>日本語による説明</th>
              <th>例文</th>
            </tr>
          </thead>
          <tbody>
            {wordLists.map((item: any, index: number) => (
              <tr key={index} className="border-b-2 border-neutral-500">
                <td className="text-2xl">{item.inputWord}</td>
                <td>{"imageUrl" in item ? <Image src={item.imageUrl} alt="画像" width={100} height={100} /> : <p className="text-gray-800 text-md">画像登録なし</p>}</td>
                <td>{item.explanation}</td>
                <td>{item.inJapanese}</td>
                <td>{item.example}</td>
              </tr>
            ))}
        </tbody>
        </table>
      </div>
      <button className="w-1/5 justify-self-center bg-neutral-600 text-white p-2 rounded-md hover:bg-neutral-700" onClick={() => getWordLists()}>新規リストを取得</button>
    </>
  )
}

export default Lists