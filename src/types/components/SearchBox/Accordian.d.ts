import sqlSyntaxes from "~types/sqlSyntaxes";

export interface Props {
  i: number,
  expanded: boolean | number | false,
  setExpanded: (value: false| number) => void,
  item: sqlSyntaxes,
  changeText: (text: string) => void;
}