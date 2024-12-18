import { log } from "console";
import { readFileSync } from "fs";
import { ChatCompletion } from "openai/resources";

const data:ChatCompletion = JSON.parse(readFileSync('res.json', 'utf8'));

log(data.choices[0].message.content);
