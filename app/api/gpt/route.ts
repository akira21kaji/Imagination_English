import { useWordsContext } from "@/src/lib/words/wordsContext";
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const prompt = `
※上記単語を以下に沿って返答してください※
以下プロンプトを実行する前に、以下文章を必ず守るようにしてください。

##一番最初に実行すること
もし入力された英単語の綴りが間違っている場合は、「依頼内容」「返答内容」「制約条件」を完全に無視してください。
そして、「もしかして正しい単語は（正しい単語）ですか？」と返答してください。（正しい単語）の部分に正しいスペルの英単語を返答してください。
または、「空白」で英単語が入力された場合には、「依頼内容」「返答内容」「制約条件」を完全無視し、
「空白です。」と返答してください。

以下からは、正しい英単語が入力されたときのみ実施してください。

##依頼内容
入力された「英単語」を「返答内容」に沿って順不同で返答してください。
その際に「制約条件」を必ず漏らさず守るようにしてください。
英単語がエラーの場合は、「##エラー時の返答」に必ず従い、「##制約条件」は無視をしてください。

##返答内容
1. 英単語を英語で説明(explanation)
2. 英語の説明文を日本語に訳す(explanationに対する日本語訳を行う)
3. 英単語の事例の紹介(example)

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

const openAi = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function POST(req: NextRequest, res: NextResponse){
  const { inputWord, setInputWord } = useWordsContext() || {};

  try {
    const gptResponse = await openAi.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: prompt + req.body}],
    });

    const explanation = gptResponse?.choices?.[0]?.message?.content ?? '';
    if(setInputWord) setInputWord('');
    return NextResponse.json({explanation});
  } catch (error) {
    console.error("Error generating explanation:", error);
    return NextResponse.json({message: 'Internal server error'});
  }
}