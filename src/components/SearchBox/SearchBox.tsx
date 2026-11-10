import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  queryValue: string;
}

export default function SearchBox({ onSearch, queryValue }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search posts"
      value={queryValue}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
