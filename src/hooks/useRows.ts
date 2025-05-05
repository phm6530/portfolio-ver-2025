import { ChangeEvent, useState } from "react";

const useRows = (
  initalRow = 2
): [number, (e: ChangeEvent<HTMLTextAreaElement>) => void] => {
  const [rows, setRows] = useState<number>(initalRow);

  const rowsHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const newLineCount = Math.max(value.split("\n").length, initalRow);
    setRows(newLineCount);
  };

  return [rows, rowsHandler];
};

export default useRows;
