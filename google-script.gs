// -------------------------------------------------------------------------------------------- 
// COPY THIS CODE INTO YOUR GOOGLE SHEETS SCRIPT EDITOR 
// 1. Open your Google Sheet 
// 2. Go to Extensions > Apps Script 
// 3. Delete any code there and paste this code 
// 4. Save the project (File > Save) 
// 5. Deploy as Web App: 
//    - Click "Deploy" > "New deployment" 
//    - Select type: "Web app" 
//    - Description: "Form Handler" 
//    - Execute as: "Me" (your email) 
//    - Who has access: "Anyone" (IMPORTANT!) 
// 6. Click "Deploy", authorize the permissions, and COPY the Web App URL 
// 7. Paste this URL into the 'index.html' file (replace the SCRIPT_URL variable)
// -------------------------------------------------------------------------------------------- 

function doPost(e) { 
  // Get the active sheet 
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  
  // If headers don't exist, add them 
  if (sheet.getLastRow() === 0) { 
    sheet.appendRow(["Timestamp", "Full Name", "Email", "Portfolio Link", "Niche", "Software"]); 
    // Freeze the first row 
    sheet.setFrozenRows(1); 
    // Make headers bold 
    sheet.getRange(1, 1, 1, 6).setFontWeight("bold"); 
  } 

  try { 
    // Parse the incoming JSON data 
    // Note: When sending from fetch() with mode 'no-cors', parameters might be in e.parameter 
    
    var timestamp = new Date(); 
    var name = e.parameter.name || "N/A"; 
    var email = e.parameter.email || "N/A"; 
    var portfolio = e.parameter.portfolio || "N/A"; 
    var niche = e.parameter.niche || "N/A"; 
    var experience = e.parameter.experience || "N/A"; 

    // Append the data to the sheet 
    sheet.appendRow([timestamp, name, email, portfolio, niche, experience]); 

    // Return success result 
    return ContentService 
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() })) 
      .setMimeType(ContentService.MimeType.JSON); 

  } catch (error) { 
    // Return error result 
    return ContentService 
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() })) 
      .setMimeType(ContentService.MimeType.JSON); 
  } 
} 

// Helper function to test setup 
function setupHeaders() { 
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  sheet.clear(); 
  sheet.appendRow(["Timestamp", "Full Name", "Email", "Portfolio Link", "Niche", "Software"]); 
  sheet.setFrozenRows(1); 
  sheet.getRange(1, 1, 1, 6).setFontWeight("bold"); 
}