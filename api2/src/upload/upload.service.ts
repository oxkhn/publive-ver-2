import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as XLSX from 'xlsx';

@Injectable()
export class UploadService {
  readExcelFile(filePath: string): any[] {
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet);

    return data;
  }

  readExcelFileWithImage(filePath: string): any[] {
    // Read the Excel file
    const workbook = XLSX.readFile(filePath, { cellDates: true });

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON with raw data
    const data = XLSX.utils.sheet_to_json(sheet, { raw: true });

    // Define the fields that are date fields
    const dateFields = ['startDate', 'endDate']; // Thêm các trường ngày tháng khác nếu có

    // Process each row to merge image columns into an array and fix date fields
    const processedData = data.map((row: any) => {
      const images: string[] = [];

      // Loop through all keys (columns) in the row
      for (const key in row) {
        if (key.toLowerCase().includes('image')) {
          images.push(row[key]); // Add the image to the images array
          delete row[key]; // Remove the image column from the row
        }

        // Kiểm tra nếu trường là một trong các trường ngày tháng cần xử lý
        if (dateFields.includes(key)) {
          const value = row[key];
          if (typeof value === 'number') {
            row[key] = this.excelSerialToDate(value);
          } else if (value instanceof Date) {
            // Nếu đã là Date, có thể định dạng lại nếu cần
            row[key] = new Date(value); // Hoặc sử dụng thư viện định dạng ngày tháng như dayjs
          } else {
            // Xử lý các trường hợp khác nếu cần
            // Ví dụ: chuyển đổi chuỗi thành Date nếu định dạng hợp lệ
            const parsedDate = new Date(value);
            if (!isNaN(parsedDate.getTime())) {
              row[key] = parsedDate;
            } else {
              // Nếu không thể chuyển đổi, giữ nguyên hoặc đặt giá trị mặc định
              row[key] = null;
              // Hoặc log một cảnh báo
              console.warn(
                `Không thể chuyển đổi trường ${key} với giá trị: ${value}`,
              );
            }
          }
        }
      }

      // Add the merged image array to the row
      row.imageList = images;

      return row;
    });

    return processedData;
  }

  readExcelFileAffiliate(filePath: string): any[] {
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
        const fbLink =
          socialLinks.match(/FB:\s*(https?:\/\/[^\s]+)/)?.[1] || '';
        const igLink =
          socialLinks.match(/IG:\s*(https?:\/\/[^\s]+)/)?.[1] || '';
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
  }

  /**
   * Chuyển đổi số serial Excel thành đối tượng Date
   * @param {number} serial - Số serial từ Excel
   * @returns {Date} - Đối tượng Date tương ứng
   */
  excelSerialToDate(serial: number): Date {
    // Excel's epoch starts on 1899-12-30, not 1900-01-01
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    return new Date(excelEpoch.getTime() + serial * millisecondsPerDay);
  }
}
