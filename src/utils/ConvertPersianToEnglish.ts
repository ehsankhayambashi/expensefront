const convertPersianToEnglish = (persianNumber: string) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";
  return persianNumber.replace(
    /[۰-۹]/g,
    (d) => englishDigits[persianDigits.indexOf(d)]
  );
};
export default convertPersianToEnglish;
