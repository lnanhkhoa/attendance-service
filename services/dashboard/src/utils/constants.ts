import moment, { months } from "moment";

export const NODE_ENV = process.env.NODE_ENV || "development";
export const isDev = NODE_ENV === "development";

export const DEV_SYSTEM_USER = isDev ? "admin@system.com" : "";
export const DEV_SYSTEM_PASS = isDev ? "Admin@123" : "";

export const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

export const IMAGE_DEFAULT =
  "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80";

export const toFahrenheit = (value = 0) => parseFloat(String((value * 9) / 5 + 32)).toFixed(2);
export const toCelsius = (value: number) => ((value - 32) * 5) / 9;

export enum SelectTime {
  today = "today",
  last7Days = "last7Days",
  currentMonth = "currentMonth",
  all = "all",
}

export const getQueryTime = (selectTime: SelectTime) => {
  function setEnd(time: moment.Moment) {
    return time.set("hours", 23).set("minutes", 59).set("seconds", 59).toISOString();
  }
  function setStart(time: moment.Moment) {
    return time.set("hours", 0).set("minutes", 0).set("seconds", 0).toISOString();
  }

  switch (selectTime) {
    case SelectTime.today: {
      const startTime = setStart(moment());
      const endTime = setEnd(moment());
      return {
        AND: [
          //
          { createdAt: { gte: startTime } },
          { createdAt: { lte: endTime } },
        ],
      };
    }
    case SelectTime.last7Days: {
      const firstDay = moment().subtract(7, "days");
      return {
        AND: [
          //
          { createdAt: { gte: setStart(firstDay) } },
          { createdAt: { lte: setEnd(moment()) } },
        ],
      };
    }
    case SelectTime.currentMonth: {
      const firstDay = moment().startOf("month");
      const lastDay = moment().endOf("month");
      return {
        AND: [
          //
          { createdAt: { gte: setStart(firstDay) } },
          { createdAt: { lte: setEnd(lastDay) } },
        ],
      };
    }
    case SelectTime.all:
      return {};
    default:
      return {};
  }
};
