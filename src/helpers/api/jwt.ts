import jwt, { JwtPayload } from "jsonwebtoken";
import variables from "variables";

const secretKey = variables.JWT_WEBTOKEN;

export function generateToken(payload: object): string {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, secretKey) as JwtPayload;
    } catch (err) {
        return null;
    }
}
