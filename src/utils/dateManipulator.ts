export function secondsToDate(seconds: string) {
  let parsedSeconds = parseInt(seconds);
  const date = new Date(parsedSeconds * 1000);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  } as Intl.DateTimeFormatOptions;

  const formattedDate = date.toLocaleDateString("en-GB", options);

  const day = date.getDate();
  const suffix = getDaySuffix(day);

  return formattedDate.replace(/\b\d+\b/, day + suffix);
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
