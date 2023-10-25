export default async function getCharactersList() {
  const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // headers.append('Allow-Origin', '*');

    const response = await fetch( "https://swapi.dev/api/people", {
        method: 'GET',
        headers,
    });
    return response.json();
}