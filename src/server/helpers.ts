import { sign, verify } from "hono/jwt";

export const generateToken = async (userId: number, secret: string) => {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    sub: userId,
    iat: now,
    exp: now + 1 * 60 * 60, //1 hour
  };

  const token = await sign(payload, secret!);
  return token;
};

export const verifyToken = async (token: string, secret: string) => {
  return await verify(token, secret, 'HS256');
}

export const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    key,
    256,
  );

  const combined = new Uint8Array(salt.byteLength + hash.byteLength);
  combined.set(salt, 0);
  combined.set(new Uint8Array(hash), salt.byteLength);
  return btoa(String.fromCharCode(...combined));
};

export const verifyPassword = async (
  password: string,
  stored: string,
): Promise<boolean> => {
  const encoder = new TextEncoder();
  const combined = Uint8Array.from(atob(stored), (c) => c.charCodeAt(0));
  const salt = combined.slice(0, 16);
  const storedHash = combined.slice(16);

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    key,
    256,
  );

  const hashArray = new Uint8Array(hash);
  return hashArray.every((byte, i) => byte === storedHash[i]);
};
