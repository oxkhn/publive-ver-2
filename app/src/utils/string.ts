export const formatVND = (amount: number | undefined) => {
  if (!amount) return 0;
  return amount!.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export function formatNumberToK(number?: number) {
  if (!number) return 0;
  if (number >= 1000000) {
    // If the number is 1 million or greater
    const formattedNumber = (number / 1000000).toFixed(1); // Divide by 1,000,000 and keep one decimal
    return formattedNumber.endsWith(".0")
      ? formattedNumber.slice(0, -2) + "M"
      : formattedNumber + "M";
  } else if (number >= 1000) {
    // If the number is 1 thousand or greater
    const formattedNumber = (number / 1000).toFixed(1); // Divide by 1,000 and keep one decimal
    return formattedNumber.endsWith(".0")
      ? formattedNumber.slice(0, -2) + "k"
      : formattedNumber + "k";
  }
  return number.toString(); // Return the original number if it's less than 1000
}

export function convertTimestampToDateString(
  timestamp: number | undefined,
): string {
  if (timestamp === undefined) {
    return "Invalid timestamp";
  }

  // Multiply by 1000 because JavaScript Date expects milliseconds
  const date = new Date(timestamp * 1000);

  // Format the date string
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
