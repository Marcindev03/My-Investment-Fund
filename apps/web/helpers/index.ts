export const generatePassword = () => {
  const passwordLength = 16;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[];:<>,.?/";
  const cryptoObj = window.crypto;
  const passwordSet = new Set();
  while (passwordSet.size < passwordLength) {
    const randomValue = new Uint32Array(1);
    cryptoObj.getRandomValues(randomValue);
    const charIndex = randomValue[0] % charset.length;
    const char = charset.charAt(charIndex);
    passwordSet.add(char);
  }
  const password = Array.from(passwordSet).join("");
  return password;
};
