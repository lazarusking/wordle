import { ShareIcon } from "@heroicons/react/24/outline";
import Countdown from "react-countdown";
import {
  BEST_STREAK,
  CURRENT_STREAK,
  SUCCESS_RATE,
  TOTAL_GAMES,
} from "../../constants/strings";
import { useAlertContext } from "../../contexts/AlertContext";
import { useStorageContext } from "../../contexts/StorageContext";
import { shareStatus } from "../../utils/share";
import { solution, tomorrow } from "../../utils/words";
import BaseModal from "./BaseModal";

function StatsItem({ label, value }) {
  return (
    <div className="m-1">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}
function StatsList({ stats }) {
  return (
    <>
      <StatsItem label={TOTAL_GAMES} value={stats.gamesPlayed} />
      <StatsItem label={SUCCESS_RATE} value={stats.winPercentage} />
      <StatsItem label={CURRENT_STREAK} value={stats.currentStreak} />
      <StatsItem label={BEST_STREAK} value={stats.bestStreak} />
    </>
  );
}
export default function StatsModal({ setShow, setModal, gameStatus,gamedata,wordGuessCount }) {
  const {
    gamedata: { stats },
  } = useStorageContext();
  const { displayNotification } = useAlertContext();

  const { guesses } = stats;

  const maxValue = maxGuess();

  return (
    <BaseModal title={"Statistics"} setShow={setShow} setModal={setModal}>
      <div className="space-y-2 sm:mx-4 px-6 pt-0 pb-4 sm:pb-4">
        <div className="text-center grid grid-flow-col justify-evenly">
          <StatsList stats={stats} />
        </div>
        <div className="text-center font-medium">
          <p>Guess Distribution</p>
          {Object.keys(guesses).map((index) => {
            const size = 90 * (guesses[index] / maxValue);

            return (
              <div key={index} className="flex white-score space-x-2 p-1">
                <span>{index}</span>{" "}
                <span
                  style={{ width: `${5 + size}%` }}
                  className={`${
                    guesses[index] == 0 ? "bg-slate-700" : "bg-blue-700"
                  }`}
                >
                  {guesses[index]}
                </span>
              </div>
            );
          })}
        </div>
        {(gameStatus[0] || gameStatus[1]) && (
          <div className="grid grid-cols-2">
            <div className='text-left'>
              <p>New guess word in</p>
              <Countdown
                className="text-lg font-medium"
                date={tomorrow}
                daysInHours={true}
              />
            </div>
            <div>
              <button
                className="bg-indigo-600 text-white flex items-center justify-center p-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={()=>shareStatus(solution,gamedata,wordGuessCount,gameStatus[1],displayNotification)}
              >
                <ShareIcon className="mr-2 h-6 w-6" />
                <span>Share</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          onClick={() => setModal(false)}
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </BaseModal>
  );

  function maxGuess() {
    let max = 1;
    for (const i in guesses) {
      max = Math.max(guesses[i], max);
    }
    return max;
  }
}
