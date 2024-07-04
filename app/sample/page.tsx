'use client';
import { useState } from 'react';

const Page = () => {
  const [message, setMessage] = useState('')
  const handleClick = async () => {
    const response = await fetch('/api/gpt', {
      method: 'POST',
      body: JSON.stringify({
        prompt: 'This is a test prompt'
      })
    })
    const data = await response.json()
    console.log(data.body.message)
    setMessage(data.body.message)
  }

  return (
    <div className="bg-white h-lvh flex flex-col justify-center items-center">
      <button className="bg-blue-500 rounded text-white p-3" onClick={handleClick}>Make a POST request</button>
      <div className="p-4">{message}</div>
    </div>
  )
}

export default Page;
