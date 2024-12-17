import { log } from 'console';
import { config } from 'dotenv';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
config();

const client = new OpenAI({
    baseURL: process.env["OPENAPI_URL"],
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

async function main() {
    const prompt = "write a quick sort algorithm.";
    const messages:Array<ChatCompletionMessageParam> = [
        {role: "system", content: "You are Qwen, created by Alibaba Cloud. You are a helpful assistant."},
        {role: "user", content: prompt}
    ]
    const chatCompletion = await client.chat.completions.create({
        messages:messages,
        model: process.env["MODULE"],
        temperature:1,
        top_p:1,
        max_completion_tokens:256,
        frequency_penalty:0,
        presence_penalty:0
    });
    log(chatCompletion.choices[0].message)
}

main();