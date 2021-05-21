export interface Row {
  id: string;
  label: string;
  urls: string[];
}

export interface MovieListProps {
  row: Row;
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
  bkgColor?: string;
}

export type ColorMap = { [key: string]: string };
