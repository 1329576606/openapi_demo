import { log } from 'console';
import { config } from 'dotenv';
import OpenAI from 'openai';
config();

const client = new OpenAI({
    baseURL: process.env["OPENAPI_URL"],
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

async function main() {
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: process.env["MODULE"],
    });
    log(chatCompletion.choices[0].message)
}

main();