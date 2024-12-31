import { log } from 'console';
import { config } from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { auditor_format_constrain, auditor_prompt, topk_prompt1, topk_prompt2, topk_prompt_chinese } from './prompts';
config();

const client = new OpenAI({
    baseURL: process.env["OPENAPI_URL"],
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

function removeSolidityComments(code: string) {
    // Remove single-line comments
    code = code.replace(/\/\/.*$/gm, '');
    // Remove multi-line comments
    code = code.replace(/\/\*[\s\S]*?\*\//gm, '');
    return code;
}

async function main() {
    let code = readFileSync('code/code.sol', { encoding: 'utf-8' });
    code = removeSolidityComments(code);
    //删除代码中换行符和多余的空格
    code = code.replace(/\n/g, '');
    code = code.replace(/\s+/g, ' ');
    const prompt = auditor_prompt + code + auditor_format_constrain + topk_prompt1.replace('{topk}', '10') + topk_prompt2 + topk_prompt_chinese;
    const messages: Array<ChatCompletionMessageParam> = [
        { role: "system", content: "You are Qwen, created by Alibaba Cloud. You are a helpful assistant." },
        { role: "user", content: prompt }
    ]
    const chatCompletion = await client.chat.completions.create({
        messages: messages,
        model: process.env["MODULE"],
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    log(chatCompletion.choices[0].message.content)
    writeFileSync('res_data.json', chatCompletion.choices[0].message.content, { encoding: 'utf-8' })
    // log(JSON.stringify(chatCompletion))
}

main();