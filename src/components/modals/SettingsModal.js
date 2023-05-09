import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  COLOR_SCHEME_TOGGLE_DESCRIPTION,
  DAILY_MODE_DESCRIPTION,
  HARD_MODE_DESCRIPTION,
  HIGH_CONTRAST_DESCRIPTION,
} from "../../constants/strings";
import { useStorageContext } from "../../contexts/StorageContext";
import BaseModal from "./BaseModal";
import Toggle from "./Toggle";

function SettingsItem({
  label,
  description,
  isTrue,
  toggleFunc,
  toggleComponent,
}) {
  return (
    <div className="flex text-left items-center justify-between gap-4 py-3">
      <div>
        <p>{label}</p>
        <span className="text-xs font-normal">{description}</span>
      </div>
      <Toggle label={label} isTrue={isTrue} toggleFunc={toggleFunc}>
        {toggleComponent}
      </Toggle>
    </div>
  );
}
export default function SettingsModal({ setModal }) {
  const { settings, setGameSettings } = useStorageContext();
  const [isDark, setDark] = useState(settings.darkMode);
  const [isHardMode, setHardMode] = useState(settings.hardMode);
  const [isDailyMode, setDailyMode] = useState(settings.dailyMode);
  const [isColorBlindMode, setColorBlindMode] = useState(
    settings.colorblindMode
  );
  const themeChange = function () {
    const t = settings.darkMode ? false : true;
    setGameSettings({ ...settings, darkMode: t });
    setDark((bool) => !bool);
  };
  const hardModeChange = function () {
    const t = settings.hardMode ? false : true;
    setGameSettings({ ...settings, hardMode: t });
    setHardMode((bool) => !bool);
  };
  const contrastChange = function () {
    const t = settings.colorblindMode ? false : true;
    setGameSettings({ ...settings, colorblindMode: t });
    setColorBlindMode((bool) => !bool);
  };
  const dailyModeChange = function () {
    const t = settings.dailyMode ? false : true;
    setGameSettings({ ...settings, dailyMode: t });
    setDailyMode((bool) => !bool);
  };
  useEffect(() => {
  
    return () => {
    }
  }, [settings])
  

  return (
    <BaseModal title={"Settings"} setModal={setModal}>
      <div className="px-6 font-bold pt-0 pb-4 divide-y-2 sm:pb-4">
        {/* <SettingsItem
          label={"Hard Mode"}
          isTrue={isHardMode}
          description={HARD_MODE_DESCRIPTION}
          toggleFunc={hardModeChange}
        /> */}
        <SettingsItem
          label={"Daily Mode"}
          isTrue={isDailyMode}
          description={DAILY_MODE_DESCRIPTION}
          toggleFunc={dailyModeChange}
        />
        <SettingsItem
          label={"High Contrast Mode"}
          isTrue={isColorBlindMode}
          description={HIGH_CONTRAST_DESCRIPTION}
          toggleFunc={contrastChange}
        />
        <SettingsItem
          label={"Dark Mode"}
          isTrue={isDark}
          description={COLOR_SCHEME_TOGGLE_DESCRIPTION}
          toggleFunc={themeChange}
          toggleComponent={<DarkModeToggle isTrue={isDark} />}
        />
      </div>
    </BaseModal>
  );
}
function DarkModeToggle({ isTrue }) {
  return (
    <>
      {isTrue ? (
        <MoonIcon
          title="themeIcon"
          className="pointer-events-none rounded-lg text-[var(--background)]"
        />
      ) : (
        <SunIcon
          title="themeIcon"
          className="pointer-events-none rounded-full dark: text-white bg-yellow-500 "
        />
      )}
    </>
  );
}
// function Toggle({ isTrue = false, toggleFunc = null, children }) {
//   return (
//     <div
//       onClick={toggleFunc}
//       className={`w-14 h-8 items-center inline-flex border border-gray-300 ${
//         isTrue ? "bg-blue-300" : "bg-gray-300"
//       } rounded-full p-1 duration-200 ease-in-out`}
//     >
//       <button
//         className={`${isTrue && "translate-x-6"} ${
//           !children && "bg-[var(--background)]"
//         } flex pointer-events-none w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out`}
//       >
//         {children}
//       </button>
//     </div>
//   );
// }

{
  /* <div className="flex items-center justify-between gap-4 py-3">
          <div>Dark Mode</div>
          {isDark ? (
            <SunIcon
              onClick={themeChange}
              title="themeIcon"
              className="w-8 h-8 rounded-lg dark:text-yellow-200 text-indigo-500 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 "
            />
          ) : (
            <MoonIcon
              onClick={themeChange}
              title="themeIcon"
              className="w-8 h-8 rounded-lg  dark:text-yellow-200 text-indigo-500 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 "
            />
          )}
          <DarkModeToggle themeChange={themeChange} isDark={isDark} />
        </div> */
}
