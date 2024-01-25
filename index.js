const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Read the JSON file
const inputFile = "output.json"; // Replace with your JSON file name
const jsonArray = require(`./${inputFile}`);

// Check if the array is not empty
if (jsonArray.length === 0) {
  console.error("Error: The JSON array is empty.");
  process.exit(1);
}

// Format the JSON for readability
const formattedJson = JSON.stringify(jsonArray, null, 2);

// Save the formatted JSON to a new file (optional)
const formattedOutputFile = "formatted-output.json";
fs.writeFileSync(formattedOutputFile, formattedJson);

// Extract the "data" key from each object
const extractedDataArray = jsonArray.map((obj) => obj.data);

// Flatten the extracted data array
const flattenedDataArray = extractedDataArray.map((dataArray) =>
  dataArray.map((data) => ({ ...data }))
);

// Create a CSV writer
const csvWriter = createCsvWriter({
  path: "output-alient-tech.csv",
  header: Object.keys(flattenedDataArray[0][0]).map((key) => ({
    id: key,
    title: key,
  })),
});

// Write the flattened data to a CSV file
csvWriter
  .writeRecords(flattenedDataArray.flat())
  .then(() => console.log("CSV file has been written successfully"))
  .catch((error) => console.error("Error writing CSV file:", error));
