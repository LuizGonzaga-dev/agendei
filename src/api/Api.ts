import axios from "axios";

const ngrokUrl = "https://b624-45-233-247-34.ngrok-free.app";

export const api = axios.create({
    baseURL: `${ngrokUrl}/api/`
});