export interface Decrypter {
  decrypt(encryptedValue: string): Promise<any>;
}
