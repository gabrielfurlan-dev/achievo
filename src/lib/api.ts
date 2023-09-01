export function apiUrlBase() {
    if (process.env.NODE_ENV === "production") {
        return "https://weeklyreport-preview.vercel.app";
    }
    else {
        return "http://localhost:3000";
    }
}

