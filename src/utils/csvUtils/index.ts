export default async function ParseCSVfromURL(url: string): Promise<string[]> {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const parsedData = parseCSV(data);
    return parsedData;
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error);
    return [];
  }
}

function parseCSV(csvData: string): string[] {
  const lines = csvData.split("\n");
  const headers = lines[0].split(",");
  const symbols: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(",");
    if (currentLine.length === headers.length) {
      symbols.push(currentLine[2]);
    }
  }

  return symbols;
}
