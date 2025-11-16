import XLSX from 'xlsx';
import fs from 'fs';

// This script creates a dummy 'prices.xlsx' file to test your server.

const data = [
  { id: 1, name: 'Acetone 99.5% Ultra Pure', price: 48.50 },
  { id: 2, name: 'Sodium Hydroxide Pearl', price: 29.00 },
  { id: 3, name: 'Ethanol Absolute ACS', price: 65.00 },
  { id: 4, name: 'Polyethylene HDPE Granules', price: 1.35 },
  { id: 5, name: 'Aspirin BP/USP Grade', price: 125.00 },
  { id: 6, name: 'Ammonium Nitrate Fertilizer', price: 0.90 }
];

// Create a new workbook
const wb = XLSX.utils.book_new();

// Convert data to worksheet
const ws = XLSX.utils.json_to_sheet(data);

// Add worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, "Prices");

// Write to file
XLSX.writeFile(wb, "prices.xlsx");

console.log("✅ 'prices.xlsx' created successfully!");
console.log("   You can now open this file in Excel to change prices.");
console.log("   The server will read this file automatically.");