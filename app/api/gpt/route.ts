// import { useWordsContext } from "@/src/lib/words/wordsContext";
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

// const prompt = `
// ※上記単語を以下に沿って返答してください※

// ##依頼内容
// 入力された「英単語」を「##返答順序」を「##返答形式」に従い順不同で返答してください。
// その際に「##制約条件」を必ず漏らさず守るようにしてください。
// 英単語がエラーの場合は、「##エラー時の返答」に必ず従い、「##制約条件」は無視をしてください。

// ##返答順序
// 1. 入力された英単語をそのまま記載（entryWords）
// 2. 英単語を英語で説明(explanation)
// 3. 英語の説明文を日本語に訳す(explanationに対する日本語訳を行う)
// 4. 英単語の事例の紹介(example)

// 上記の順番で返答し、以下のようにjson形式で返答をしてください。

// ##返答形式
// entryWords:
// explanation:
// inJapanese:
// example:

// ##制約条件
// - 英単語の綴りが間違っている場合は、日本語で指摘し、「返答内容」に沿わずに返答してください
// - 英単語を英語で説明する際は、入力された英単語を使わずに「This word is」という形で返答
// - 返答する文章は簡潔かつ簡単な英単語を使い、１つのセンテンスに収まるようにすること
// - もし英単語の綴りが間違えていた場合は、以下条件に必ず漏らさず従い、返答してください

// ##エラー時の返答
// 英単語の綴りが間違っている、二文字入力されているなど条件にあわない場合は、
// json形式は無視して、近しい英単語を返答してください。
// `;

// const englishPrompt = `
// Please answer the above words according to the following. 

// If the English word is spelled incorrectly, please ignore all of the following conditions and reply with the English word you think is correct.

// ## Description of request
// Please answer the entered "English words" according to "## Order of reply" and "## Form of reply."
// Please make sure to follow the "## Constraints."
// If an English word is an error, please follow the "## Response in case of error" and ignore the "## Constraints."

// ## Order of reply
// 1. Explain the English word in English (explanation)
// 2. Translate the English explanation into Japanese (Japanese translation for explanation)
// 3. Example of English word (example)

// Please reply in the order shown above and reply only in json format as follows.

// ## Response Format
// explanation:
// inJapanese:
// example:

// ## Constraints
// - If an English word is misspelled, please indicate it in Japanese and reply without following the "Reply Content"
// - When explaining an English word in English, please reply in the form "This word is" without using the typed English word
// - Reply sentences should be concise and simple, and should fit in one sentence
// - If an English word is misspelled, please reply with the following conditions

// ## Reply in case of error
// If an English word is misspelled or typed with two letters, etc.,
// please reply with the closest English word, ignoring the json format.
// `;

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

const gptPrompt =`
以下の英単語を役割に従い、英語説明、英語説明の日本語訳、英単語の例文をJSON形式で返答してください。
入力された英単語：`

//OpenAIクライアントを作成
const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

//
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
        {
          role: 'system',
          content: gptRole
        },
        {
          role: 'user',
          content: gptPrompt + body.inputWord
        }
      ],
    });

    //GPT-3.5モデルでレスポンスを取得
    console.log('gptResponse', gptResponse);
    // const explanation = gptResponse?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments ?? '';
    // console.log('explanation', explanation);
    // console.log(gptResponse.choices[0].message); 

    const explanation = gptResponse?.choices?.[0]?.message?.content ?? '';
    console.log('explanation:', explanation);
    return NextResponse.json({
      status: 200,
      body: explanation,
    });
  } catch (error) {
    console.error("Error generating explanation:", error);
    return NextResponse.json({message: 'Internal server error'});
  }
}