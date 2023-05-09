export default function Toggle({
  isTrue = false,
  toggleFunc = null,
  label,
  children,
}) {
  return (
    <div
      onClick={toggleFunc}
      className={`w-14 h-8 items-center inline-flex flex-shrink-0 ${
        isTrue ? "bg-blue-300" : "bg-slate-300"
      } rounded-full p-1 duration-200 ease-in-out`}
    >
      <button
        aria-label={label}
        className={`${isTrue && "translate-x-6"} ${
          !children && "bg-[var(--background)]"
        } flex pointer-events-none w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out`}
      >
        {children}
      </button>
    </div>
  );
}
