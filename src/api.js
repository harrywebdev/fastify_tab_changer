// Simulated API data fetching
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function fetchData() {
  try {
    // Read the mock API data from a JSON file
    const dataPath = join(dirname(__dirname), 'data', 'api.json');
    const data = await readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data from API');
  }
}
