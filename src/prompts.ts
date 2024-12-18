export const contractReviewPrompt:string = 
`Create a list of 40 top key scam or rug pull issues that may exist in smart contracts. 
These issues should be aligned with the kind of analysis conducted by AI Smart Contract Auditors similar to ZACHXBT or a senior smart contract auditor and engineer. 
Provide the issues in concise bullet points with clear and straightforward explanations of each issue.
content:

`;

// ####### Basic Prompt ########
export const topk_prompt1:string = 'Output {topk} most severe vulnerabilities.\n'
export const topk_prompt2:string = 'If no vulnerability is detected, you should only output in this json format {"output_list": []}.\n'
export const topk_prompt_chinese:string = '请使用中文\n'

// ####### Auditor Prompt #######
export const auditor_prompt:string = 'You are a smart contract auditor, identify and explain severe vulnerabilities in the provided smart contract. Make sure that they are exploitable in real world and beneficial to attackers. Provide each identified vulnerability with intermediate reasoning and its associated function. Remember, you must provide the entire function code and do not use "...". Make your reasoning comprehensive and detailed. Smart contract code:\n\n'
export const auditor_format_constrain:string = `\nYou should only output in below json format:
{
    "output_list": [
        {
            "function_name": "<function_name_1>",
            "code": "<original_function_code_1>",
            "vulnerability": "<short_vulnera_desc_1>",
            "reason": "<reason_1>"
        },
        {
            "function_name": "<function_name_2>",
            "code": "<original_function_code_2>",
            "vulnerability": "<short_vulnera_desc_2>",
            "reason": "<reason_2>"
        }
    ]
}
`