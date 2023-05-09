import Cell from "../WordleContainer/WordleCells/Cell";
import Row from "../WordleContainer/WordleCells/Row";
import BaseModal from "./BaseModal";

export default function InfoModal({ setModal }) {
  return (
    <BaseModal title={"How to play"} setModal={setModal}>
      <div className="px-6 pt-0 pb-4 sm:pb-4">
        <div className="text-sm sm:text-base font-normal leading-normal">
          <p>
            Guess the word in a 6 tries. After each guess, the color of the
            tiles will change to show how close your guess was to the word.
          </p>
        </div>

        <div>
          <Row
            size={5}
            word={"TABLE"}
            colorString={"01012"}
            className={
              "grid grid-cols-5-3rem gap-1 justify-center auto-rows-[3rem] text-2xl"
            }
          />
          <div className="info-shade text-lg leading-normal p-3 my-3 grid gap-2 rounded-md">
            <div className="space-x-2">
              <Cell value={"T"} className={"w-6 absent text-white"} />
              <Cell value={"B"} className={"w-6 absent text-white"} />
              <span className="text-sm sm:text-base font-normal ">{`aren't in the target word at all.`}</span>
            </div>
            <div className="space-x-2">
              <Cell value={"A"} className={"w-6 exists text-white"} />
              <Cell value={"L"} className={"w-6 exists text-white"} />
              <span className="text-sm sm:text-base font-normal ">
                is in the word but in the wrong spot.
              </span>
            </div>
            <div className="space-x-2">
              <Cell value={"E"} className={"w-6 correct text-white"} />
              <span className="text-sm sm:text-base font-normal ">
                is in the word and in the correct spot.
              </span>
            </div>
          </div>
        </div>

        {/* <div className="ext-xl">
          <Row size={5} word={"WEARY"} colorString={"23333"} className={'grid grid-cols-5-3rem gap-1 justify-center auto-rows-[3rem] text-2xl'}></Row>
        </div>
        <span>The letter W is in the word and in the correct spot.</span>
        <div className="ext-lg">
          <Row size={5} word={"PILLS"} colorString={"33133"} className={'grid grid-cols-5-3rem gap-1 justify-center auto-rows-[3rem] text-2xl'}></Row>
          <p>The letter L is in the word but in the worng spot.</p>
        </div>
        <div className="ext-lg">
          <Row size={5} word={"VAGUE"} colorString={"33033"} className={'grid grid-cols-5-3rem gap-1 justify-center auto-rows-[3rem] text-2xl'}></Row>
          <p>The letter U is not in the word in any spot.</p>
        </div> */}
        <div className="space-y-1">
          <Row
            size={5}
            word={"FLARE"}
            colorString={"22222"}
            className={
              "grid grid-cols-5-3rem gap-1 justify-center auto-rows-[3rem] text-2xl"
            }
          />
          <p className="text-xs sm:text-base font-medium">
            All the letters are in the correct spot.
          </p>
        </div>
      </div>
    </BaseModal>
  );
}
