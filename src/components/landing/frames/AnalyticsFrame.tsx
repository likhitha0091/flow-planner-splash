const barData = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 5 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 6 },
  { day: "Fri", hours: 4 },
  { day: "Sat", hours: 7 },
  { day: "Sun", hours: 3 },
];

const AnalyticsFrame = () => (
  <div className="w-full h-full bg-card p-4 sm:p-6 flex flex-col gap-4 font-body text-foreground">
    <div>
      <h3 className="font-display font-bold text-base sm:text-lg">Study Analytics</h3>
      <p className="text-xs text-muted-foreground">Weekly overview</p>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: "Total Hours", value: "30h" },
        { label: "Tasks Done", value: "18" },
        { label: "Streak", value: "7 days" },
      ].map((s) => (
        <div key={s.label} className="rounded-xl bg-secondary/50 p-3 text-center">
          <p className="text-lg font-bold">{s.value}</p>
          <p className="text-[10px] text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="flex-1 flex items-end gap-2 px-2">
      {barData.map((d) => (
        <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md gradient-primary min-h-[4px]"
            style={{ height: `${(d.hours / 7) * 100}%` }}
          />
          <span className="text-[9px] text-muted-foreground">{d.day}</span>
        </div>
      ))}
    </div>
  </div>
);

export default AnalyticsFrame;
