import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

// Firebaseにデータを保存するPOST method
export async function POST(req: NextRequest) {
  try {
    // body情報の取得
    const body = await req.json();

    // body情報をJSON形式で取得
    const explanation = JSON.parse(body.generateExplanation);
    // データを保存するためのオブジェクトを作成
    const newWord = {explanation, createdAt: serverTimestamp()};

    // Firebaseのwordsコレクションにデータを保存
    const newWordRef = collection(db, 'words');
    await addDoc(newWordRef, newWord);
    return NextResponse.json({ status: 200, message: "success" });
  } catch (error) {
   console.log('error', error) ;
   return NextResponse.json({ status: 500, message: "error" });
  }
}

// Firebaseからデータを取得するGET method
export async function GET(){
  // Firebaseのwordsコレクションを取得
  const wordsRef = collection(db, 'words');

  try {
    // Firebaseのwordsコレクションからデータを取得
    const wordsSnapshot = await getDocs(wordsRef);
    // Firebaseのwordsコレクションからデータを取得したものをwordListsに格納
    const wordLists = wordsSnapshot.docs.map((doc) => doc.data());

    return NextResponse.json({ status: 200, wordLists });
  } catch (error) {
    console.log('error', error)
  }
}