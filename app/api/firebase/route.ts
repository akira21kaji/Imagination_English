import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    // const newWord = {
    //   entryWords: body.generateExplanation.entryWords,
    //   explanation: body.generateExplanation.explanation,
    //   inJapanese: body.generateExplanation.inJapanese,
    //   example: body.generateExplanation.example,
    //   createdAt: serverTimestamp()
    // };
    const explanation = JSON.parse(body.generateExplanation);
    const newWord = {explanation, createdAt: serverTimestamp()};

    const newWordRef = collection(db, 'words');
    await addDoc(newWordRef, newWord);
    return NextResponse.json({ status: 200, message: "success" });
  } catch (error) {
   console.log('error', error) ;
   return NextResponse.json({ status: 500, message: "error" });
  }
}

export async function GET(){
  const wordsRef = collection(db, 'words');
  // console.log('wordsRef', wordsRef);

  try {
    const wordsSnapshot = await getDocs(wordsRef);
    const wordLists = wordsSnapshot.docs.map((doc) => doc.data());
    // console.log('wordLists', wordLists);
    return NextResponse.json({ status: 200, wordLists });
  } catch (error) {
    console.log('error', error)
  }
}