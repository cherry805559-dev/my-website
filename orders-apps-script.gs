const SHEET_NAME = "訂單";

function doPost(e) {
  const sheet = getOrderSheet_();
  const data = JSON.parse(e.postData.contents || "{}");

  sheet.appendRow([
    new Date(),
    data.product || "",
    data.name || "",
    data.phone || "",
    data.quantity || "",
    data.date || "",
    data.message || "",
    "新訂單"
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrderSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "建立時間",
      "商品名稱",
      "姓名",
      "聯絡電話",
      "數量",
      "需要日期",
      "備註需求",
      "狀態"
    ]);
  }

  return sheet;
}
