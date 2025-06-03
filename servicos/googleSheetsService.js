const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: 'credenciais-sheets.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const sheets = google.sheets({ version: 'v4', auth });

async function getSpreadsheetMetadata(spreadsheetId) {
    const metadata = await sheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });
    return metadata.data;
}

async function getSheetValues(spreadsheetId, range) {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });
    return response.data.values;
}

async function addRow(spreadsheetId, range, values) {
    const resource = {
        values: [values],
    };
    const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource,
    });
    return response.data;
}

module.exports = {
    getSpreadsheetMetadata,
    getSheetValues,
    addRow,
};