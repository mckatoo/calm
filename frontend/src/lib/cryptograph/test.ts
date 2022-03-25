import { decrypt, encrypt } from ".";
import axios from "axios";

describe('Cryptograph library', () => {

  it('should criptograph the text', () => {
    const text = 'Hello World';
    const cryptographedText = encrypt(text);

    expect(cryptographedText).not.toBe(text);
  });
  
  it('should different cryptograph result of the most text', async () => {
    const text = 'Hello World';
    const cryptographedText = encrypt(text);
    const otherCryptographedText = encrypt(text);
  
    expect(cryptographedText).not.toBe(otherCryptographedText);  
  });

  it('should decryptograph the text', () => {
    const text = 'Hello World';
    const cryptographedText = encrypt(text);
    const decryptografedText = decrypt(cryptographedText);
  
    expect(decryptografedText).toBe(text);
  })
});