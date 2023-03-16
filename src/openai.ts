/* eslint-disable @typescript-eslint/naming-convention */
import axios from "axios";

const API_KEY = "";
const baseURL = "https://api.openai.com/v1/completions";

const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
    },
});

export async function getOpenAIDescription(prompt: string): Promise<string> {
    try {
        const response = await axios.post(baseURL, {
            prompt,
            model: "text-davinci-003",
            "temperature": 0.7,
            "max_tokens": 2560,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            }
        });
        console.log(response.data);
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error(error);
        return "";
    }
}
