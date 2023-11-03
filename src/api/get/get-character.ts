import { IData } from '../../interfaces/data';

export default async function getCharacter(id: number): Promise<IData> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const response = await fetch(`https://swapi.dev/api/people/` + id, {
    method: 'GET',
    headers,
  });
  return response.json();
}
