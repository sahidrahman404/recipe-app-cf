export type Label =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

export type Chart = {
  maxValue: number;
  value: number;
  label: Label;
};

export function ChartBar({ maxValue, value, label }: Chart) {
  let barFillHeight = "0%";

  if (maxValue > 0) {
    barFillHeight = Math.round((value / maxValue) * 100) + "%";
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar--inner">
        <div
          className="chart-bar--fill"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="chart-bar--label">{label}</div>
    </div>
  );
}
