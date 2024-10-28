import * as XLSX from 'xlsx';

export const readExcelFileWithImage = (filePath: string): any[] => {
  const workbook = XLSX.readFile(filePath, { cellDates: true });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet, { raw: true });

  const processedData = data.map((row: any) => {
    const images: string[] = [];

    for (const key in row) {
      if (key.toLowerCase().includes('image')) {
        images.push(row[key]);
        delete row[key];
      }
    }
    row.imageList = images;

    return row;
  });

  data.forEach((row: any) => {
    row.publisher = Math.random() < 0.5 ? 'lazada' : 'shopee';
  });

  return processedData;
};

export const readExcelFileAffiliate = (filePath: string): any[] => {
  // Đọc file Excel
  const workbook = XLSX.readFile(filePath);

  // Lấy sheet đầu tiên
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Chuyển sheet thành JSON
  const data = XLSX.utils.sheet_to_json(sheet);

  // Duyệt qua từng phần tử của mảng `data` và xử lý tách `socialLink`
  const updatedData = data.map((item: any) => {
    // Kiểm tra nếu có trường `socialLink`
    if (item.socialLink) {
      const socialLinks = item.socialLink;

      // Tách từng link ra thành các biến riêng
      const fbLink = socialLinks.match(/FB:\s*(https?:\/\/[^\s]+)/)?.[1] || '';
      const igLink = socialLinks.match(/IG:\s*(https?:\/\/[^\s]+)/)?.[1] || '';
      const youtubeLink =
        socialLinks.match(/Youtube:\s*(https?:\/\/[^\s]+)/)?.[1] || '';
      const tiktokLink =
        socialLinks.match(/Tiktok:\s*(https?:\/\/[^\s]+)/)?.[1] || '';

      // Cập nhật lại item với các liên kết đã tách
      return {
        ...item, // Giữ lại các trường khác
        fbLink,
        igLink,
        youtubeLink,
        tiktokLink,
      };
    }

    // Trả về item nếu không có `socialLink`
    return item;
  });

  // Trả về dữ liệu đã cập nhật
  return updatedData;
};

export const readExcelFile = (filePath: string): any[] => {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);

  // Get the first sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert the sheet to JSON
  const data = XLSX.utils.sheet_to_json(sheet);

  return data;
};
