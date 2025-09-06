import type { Error } from '../types/profile';

export async function convertToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (): void => res(reader.result as string);
    reader.onerror = (): void => rej(reader.error);
    reader.readAsDataURL(file);
  });
}

export function getError(props: Error): string | undefined {
  const errorFormState = props.formState?.errors[props.key]?.message;
  const errorZod = props.errors?.[props.key]?._errors[0];

  return errorFormState || errorZod;
}
