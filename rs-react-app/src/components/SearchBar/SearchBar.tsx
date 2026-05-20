import { ChangeEvent, FormEvent, useState } from 'react';
import './index.css';

interface Props {
  initialTerm: string;
  onSearch: (term: string) => void;
}

function SearchBar(props: Props) {
  const [value, setValue] = useState(props.initialTerm);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const msg = value.trim();
    props.onSearch(msg);
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={handleChange}
        placeholder="Search Pokémon by name..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
