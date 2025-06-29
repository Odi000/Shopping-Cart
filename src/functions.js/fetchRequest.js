export async function getFetchRequest(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
    }

    return response.json()
}