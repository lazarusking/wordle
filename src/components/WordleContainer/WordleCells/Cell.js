export default function Cell({ id = "", value, animate, className }) {
  const cn = className;
  return (
    <input
      aria-labelledby={id}
      data-animate={animate ? "pop" : "none"}
      value={value || ""}
      type={"text"}
      readOnly
      className={cn}
    />
  );
}
