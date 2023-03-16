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
instance.interceptors.request.use(
    (config) => {
        console.log("Request URL:", config.url);
        console.log("Request Method:", config.method);
        console.log("Request Headers:", JSON.stringify(config.headers));
        console.log("Request Data:", JSON.stringify(config.data));
        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        console.log("Response Status:", response.status);
        console.log("Response Headers:", JSON.stringify(response.headers));
        console.log("Response Data:", JSON.stringify(response.data));
        return response;
    },
    (error) => {
        console.error("Response Error:", error);
        return Promise.reject(error);
    }
);

export async function getOpenAIDescription(prompt: string): Promise<string> {
    try {

        const response = await instance.post("", {
            prompt,
            model: "text-davinci-003",
            // "temperature": 0.7,
            "max_tokens": 2560,
            // "top_p": 1,
            // "frequency_penalty": 0,
            // "presence_penalty": 0
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error(error);
        return "";
    }
}
