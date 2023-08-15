import api from "@/lib/api";
// import { generateToken } from "./jwt";

interface IfetchData {
    method: "POST" | "GET" | "PUT" | "DELETE";
    path: string;
    jsonData: any;
}
export async function fetchData({ method, path, jsonData }: IfetchData) {
    // const token = generateToken(jsonData);

    return await fetch(api.concat(path), {
        method: method,
        body: JSON.stringify(jsonData),
        headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}`
        },
    });
}
