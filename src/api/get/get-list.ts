import { ApiResponse } from '../../interfaces/data';

export default async function getCharactersList(
  name: string,
  page: number
): Promise<ApiResponse> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const response = await fetch(
    `https://swapi.dev/api/people?search=${name}&page=${page}`,
    {
      method: 'GET',
      headers,
    }
  );
  return response.json();
}
