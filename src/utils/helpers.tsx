export async function convertToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (): void => res(reader.result as string);
    reader.onerror = (): void => rej(reader.error);
    reader.readAsDataURL(file);
  });
}
