import { colorWordleCell } from "../../../utils/gameFunctions";
import Cell from "./Cell";

export default function Row({ size, id, word = "", colorString, className }) {
  const cells = [];
  for (let index = 0; index < size; index++) {
    const letter = word ? word[index] : null;
    const colorClass = colorString ? colorWordleCell(colorString[index]) : "";
    const id = `cell-${index + 1}`;

    cells.push(
      <Cell
        key={id}
        id={id}
        value={letter}
        animate={letter && true}
        className={`${colorClass}${colorString ? " text-white cell-reveal" : ""}`}
      />
    );
  }
  return (
    <div data-id={id} className={className}>
      {cells}
    </div>
  );
}
