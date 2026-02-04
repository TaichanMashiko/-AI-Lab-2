// Google Sheet Configuration
// Sheet ID extracted from: https://docs.google.com/spreadsheets/d/1FhYzD_CBGVbuge4jQOuxe8JwXMjA8s_fK80jCYTCfvo/edit?gid=0#gid=0
const SHEET_ID = '1FhYzD_CBGVbuge4jQOuxe8JwXMjA8s_fK80jCYTCfvo';
const GID = '0'; // The first sheet is usually 0

// Construct the CSV export URL
export const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

// Google OAuth Configuration
// NOTE: For this to work on Vercel or Localhost, you must create a Project in Google Cloud Console,
// enable credentials, and paste your Client ID here.
// Since I cannot generate a valid one for you, this is a placeholder.
// Please replace this with your own Client ID from https://console.cloud.google.com/apis/credentials
export const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com"; 

export const APP_TITLE = "個人情報ビューア";