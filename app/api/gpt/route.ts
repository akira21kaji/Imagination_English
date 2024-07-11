// import { useWordsContext } from "@/src/lib/words/wordsContext";
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

// 以下プロンプトを実行する前に、「##英単語入力時にチェックする項目」を必ず守るようにしてください。

// ##英単語入力時にチェックする項目
// 正しい英単語が入力された時は、「##依頼内容」に進んでください。以下3行は必ず無視してください。
// もし入力された英単語の綴りが間違っている場合は、「##依頼内容」「##返答内容」「##制約条件」を完全に無視してください。
// そして、「もしかして正しい単語は（正しい単語）ですか？」と返答してください。（正しい単語）の部分に正しいスペルの英単語を返答してください。
// または、「空白」で英単語が入力された場合には、「依頼内容」「返答内容」「制約条件」を完全無視し、
// 「空白です。」と返答してください。

const prompt = `
※上記単語を以下に沿って返答してください※

##依頼内容
入力された「英単語」を「##返答順序」を「##返答形式」に従い順不同で返答してください。
その際に「##制約条件」を必ず漏らさず守るようにしてください。
英単語がエラーの場合は、「##エラー時の返答」に必ず従い、「##制約条件」は無視をしてください。

##返答順序
1. 入力された英単語をそのまま記載（entryWords）
2. 英単語を英語で説明(explanation)
3. 英語の説明文を日本語に訳す(explanationに対する日本語訳を行う)
4. 英単語の事例の紹介(example)

上記の順番で返答し、以下のようにjson形式で返答をしてください。

##返答形式
entryWords:
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

//OpenAIクライアントを作成
const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

//
export async function POST(req: NextRequest, res: NextResponse){
  try {
    //リクエストのボディを取得
    const body = await req.json(); //Typeキャスト
    console.log(body);

    //GPT-3.5モデルでレスポンスを生成
    const gptResponse = await openAi.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: body.inputWord + prompt}],
    });

    //GPT-3.5モデルでレスポンスを取得
    console.log(gptResponse);
    console.log(gptResponse.choices[0].message); 

    const explanation = gptResponse?.choices?.[0]?.message?.content ?? '';
    console.log(explanation);
    return NextResponse.json({
      status: 200,
      body: explanation,
    });
  } catch (error) {
    console.error("Error generating explanation:", error);
    return NextResponse.json({message: 'Internal server error'});
  }
}