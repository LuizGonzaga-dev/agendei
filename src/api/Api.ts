import axios from "axios";

const ngrokUrl = "https://b599-45-233-247-43.ngrok-free.app";

export const api = axios.create({
    baseURL: `${ngrokUrl}/api/`
});