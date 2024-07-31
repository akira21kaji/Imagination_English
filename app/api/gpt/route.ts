import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

// GPT-3.5モデルのロールのプロンプト
const gptRole = `
あなたは英英辞書として優秀なパートナーです。
入力された英単語に対して、3つの返答をしてください。
1.英単語を簡単な英単語を用いて英文で説明してください
2.１の返答文を日本語文章に翻訳してください
3.入力された英単語を使った簡単な例文を作成してください。
返答は以下のようにJSON形式で返答してください。
{
  inputWord:'入力された英単語',
  explanation:'英語の説明文',
  inJapanese:'日本語の翻訳文',
  example:'英単語の例文'
}

もし入力された英単語に誤字脱字があった場合は、以下のように返答してください。
{
  error:'誤字脱字があります。'
  correctWord:'正しい英単語'
}
`
// GPT-3.5モデルの指示文のプロンプト
const gptPrompt =`
以下の英単語を役割に従い、英語説明、英語説明の日本語訳、英単語の例文をJSON形式で返答してください。
入力された英単語：`

//OpenAIクライアントを作成
const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

//gptレスポンス取得のPOST method
export async function POST(req: NextRequest){
  try {
    //リクエストのボディを取得
    const body = await req.json(); //Typeキャスト
    console.log('body', body);

    //GPT-3.5モデルでレスポンスを生成
    const gptResponse = await openAi.chat.completions.create({
      model: 'gpt-3.5-turbo',
      response_format: { type: "json_object" },
      messages: [
        // GPT-3.5モデルのロール
        {
          role: 'system',
          content: gptRole
        },
        // GPT-3.5モデルのユーザーメッセージ
        {
          role: 'user',
          content: gptPrompt + body.inputWord
        }
      ],
    });

    // GPT-3.5モデルのレスポンスを取得
    const explanation = gptResponse?.choices?.[0]?.message?.content ?? '';

    // GPT-3.5モデルのレスポンスを返答
    return NextResponse.json({
      status: 200,
      body: explanation,
    });
  } catch (error) {
    console.error("Error generating explanation:", error);
    return NextResponse.json({message: 'Internal server error'});
  }
}