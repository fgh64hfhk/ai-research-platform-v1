export const formatDate = (rawDate: unknown): string=> {

  if (!rawDate) {
    return "查無日期資料"
  }

  if (typeof rawDate !== "string" || rawDate.length !== 8 || isNaN(Number(rawDate))) {
    return "錯誤的格式";
  }

  const year = rawDate.slice(0, 4);
  const month = rawDate.slice(4, 6);
  const day = rawDate.slice(6, 8);
  const formattedDate = `${year}-${month}-${day}`;

  const dateObject = new Date(formattedDate);

  if (
    dateObject.getFullYear().toString() !== year ||
    (dateObject.getMonth() + 1).toString().padStart(2, "0") !== month ||
    dateObject.getDate().toString().padStart(2, "0") !== day
  ) {
    return "日期不合法";
  }

  return formattedDate;
};
