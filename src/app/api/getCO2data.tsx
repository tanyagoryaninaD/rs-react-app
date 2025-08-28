import type { Countries } from '../../types/interface';

let dataPromise: Promise<Countries> | null = null;

// prevents a double request
export function getDataPromise(): Promise<Countries> {
  if (!dataPromise) {
    dataPromise = fetchData();
  }
  return dataPromise;
}

async function fetchData(): Promise<Countries | never> {
  try {
    const response = await fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    );

    if (!response.ok) {
      throw Error('Fail fetch');
    }

    const json = await response.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }

    throw Error('Fail Fetch');
  }
}
