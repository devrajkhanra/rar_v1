import { format, parse } from "date-fns";

interface DateHelpers {
  formatDatefromString: (date: string) => string;
  formatDate: (date: Date) => string;
  formatDateDash: (date: Date) => string;
  formatMonthDate: (inputDate: string) => string;
  formatDateString: (dateString: string) => string;
  getWeeklyRange: (offset: number) => string[];
  getMonthlyRange: (offset: number) => string[];
  getWeeklyRangeDash: (offset: number) => string[];
  getMonthlyRangeDash: (offset: number) => string[];
  getDatesOfTwoMonths: (offset: number) => string[];
}

const dateHelpers: DateHelpers = {
  formatDatefromString: (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${day}${month}${year}`;
  },
  formatDate: (date: Date): string => {
    const day: string = String(date.getDate()).padStart(2, "0");
    const month: string = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year: string = String(date.getFullYear());

    return `${day}${month}${year}`;
  },
  formatDateDash: (date: Date): string => {
    const day: string = String(date.getDate()).padStart(2, "0");
    const month: string = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year: string = String(date.getFullYear());

    return `${day}-${month}-${year}`;
  },
  formatMonthDate: (inputDate: string): string => {
    // Split the input string into day, month, and year
    const [day, monthStr, year] = inputDate.split("-");

    // Map month abbreviation to month number
    const monthMappings: { [key: string]: string } = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    // Get the month number from the mapping
    const month = monthMappings[monthStr];

    // Ensure that day and month have leading zeros if necessary
    const formattedDay = day.padStart(2, "0");
    const formattedMonth = month.padStart(2, "0");

    // Return the formatted date string
    return `${formattedDay}-${formattedMonth}-${year}`;
  },
  formatDateString: (dateString: string): string => {
    const [day, month, year] = dateString
      .split("-")
      .map((str) => parseInt(str));
    const parsedDate = parse(
      `${year}-${month}-${day}`,
      "yyyy-MM-dd",
      new Date()
    );
    const formattedDate = format(parsedDate, "do MMM yy");

    return formattedDate;
  },
  getWeeklyRangeDash: (offset: number): string[] => {
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() + offset * 7
    );
    const dates: string[] = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(
        firstDayOfWeek.getFullYear(),
        firstDayOfWeek.getMonth(),
        firstDayOfWeek.getDate() + i
      );
      const formattedDate = dateHelpers.formatDateDash(currentDate); // Use dateHelpers.formatDateDash
      dates.push(formattedDate);
    }
    console.log(dates);
    return dates;
  },
  getMonthlyRangeDash: (offset: number): string[] => {
    const currentDate: Date = new Date();
    const result: string[] = [];

    if (offset === 0) {
      const daysInMonth: number = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const formattedDate: string = formatDateDash(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
        );
        result.push(formattedDate);
      }
    } else {
      const targetDate: Date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + offset,
        1
      );
      const daysInMonth: number = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        0
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const formattedDate: string = formatDateDash(
          new Date(targetDate.getFullYear(), targetDate.getMonth(), i)
        );
        result.push(formattedDate);
      }
    }

    return result;
  },
  getWeeklyRange: (offset: number): string[] => {
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() + offset * 7
    );
    const dates: string[] = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(
        firstDayOfWeek.getFullYear(),
        firstDayOfWeek.getMonth(),
        firstDayOfWeek.getDate() + i
      );
      const formattedDate = dateHelpers.formatDate(currentDate); // Use dateHelpers.formatDateDash
      dates.push(formattedDate);
    }

    return dates;
  },
  getMonthlyRange: (offset: number): string[] => {
    const currentDate: Date = new Date();
    const result: string[] = [];

    if (offset === 0) {
      const daysInMonth: number = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const formattedDate: string = formatDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
        );
        result.push(formattedDate);
      }
    } else {
      const targetDate: Date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + offset,
        1
      );
      const daysInMonth: number = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth() + 1,
        0
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const formattedDate: string = formatDate(
          new Date(targetDate.getFullYear(), targetDate.getMonth(), i)
        );
        result.push(formattedDate);
      }
    }

    return result;
  },
  getDatesOfTwoMonths: (offset: number): string[] => {
    const currentDate: Date = new Date();
    const result: string[] = [];

    if (offset === 0) {
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Dates for the current month (February)
      const daysInCurrentMonth: number = new Date(
        currentYear,
        currentMonth + 1,
        0
      ).getDate();
      for (let i = 1; i <= daysInCurrentMonth; i++) {
        const formattedDate: string = formatDateDash(
          new Date(currentYear, currentMonth, i)
        );
        result.push(formattedDate);
      }

      // Dates for the next month (March)
      const daysInNextMonth: number = new Date(
        currentYear,
        currentMonth + 2,
        0
      ).getDate();
      for (let i = 1; i <= daysInNextMonth; i++) {
        const formattedDate: string = formatDateDash(
          new Date(currentYear, currentMonth + 1, i)
        );
        result.push(formattedDate);
      }
    } else {
      const targetMonth = currentDate.getMonth() + offset;
      const targetYear =
        currentDate.getFullYear() + Math.floor(targetMonth / 12);
      const remainingMonths = targetMonth % 12;

      // Dates for the first target month
      const daysInFirstMonth: number = new Date(
        targetYear,
        remainingMonths + 1,
        0
      ).getDate();
      for (let i = 1; i <= daysInFirstMonth; i++) {
        const formattedDate: string = formatDateDash(
          new Date(targetYear, remainingMonths, i)
        );
        result.push(formattedDate);
      }

      // Dates for the next month
      const daysInNextMonth: number = new Date(
        targetYear,
        remainingMonths + 2,
        0
      ).getDate();
      for (let i = 1; i <= daysInNextMonth; i++) {
        const formattedDate: string = formatDateDash(
          new Date(targetYear, remainingMonths + 1, i)
        );
        result.push(formattedDate);
      }
    }

    return result;
  },
};

export const {
  formatDatefromString,
  formatDate,
  formatDateDash,
  formatMonthDate,
  formatDateString,
  getWeeklyRange,
  getMonthlyRange,
  getWeeklyRangeDash,
  getMonthlyRangeDash,
  getDatesOfTwoMonths,
} = dateHelpers;
