import dayjs from "dayjs";

type GenerateDaysInRangeProps = {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};

export const generateDaysInRange = (props: GenerateDaysInRangeProps) => {
  const { startDate, endDate } = props;
  const daysInRange = [];
  for (
    let date = startDate;
    date.isBefore(endDate) || date.isSame(endDate);
    date = date.add(1, "day")
  ) {
    daysInRange.push(date.format("YYYY-MM-DD"));
  }
  return daysInRange;
};
