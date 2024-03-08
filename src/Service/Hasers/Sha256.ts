import crypto from 'crypto'

export const sha256 = async (plain: string): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)

    console.log(data);
    
    return crypto.subtle.digest('SHA-256', data)
}