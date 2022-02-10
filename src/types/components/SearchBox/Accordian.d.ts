import sqlSyntaxes from "~types/sqlSyntaxes";

export interface Props {
  i: number,
  expanded: Array<number>,
  setExpanded: (value: number[]) => void,
  item: sqlSyntaxes,
  changeText: (text: string) => void;
}