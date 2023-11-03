import { ApiResponse } from "../../interfaces/data";

export default async function getCharactersList(name: string):Promise<ApiResponse> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const response = await fetch('https://swapi.dev/api/people?search=' + name, {
    method: 'GET',
    headers,
  });
  return response.json();
}
