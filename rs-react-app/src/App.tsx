import './App.css';
import {useState, useEffect} from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import CardsList from './components/CardsList/CardsList';
import Pagination from './components/Pagination/Pagination';
import ErrorButton from './components/ErrorButton/ErrorButton';


import { SEARCH_KEY, PAGE_SIZE } from './constants/consts';

import useLocalStorage from './hooks/useLocalStorage.ts'
import usePokemon from './hooks/usePokemon.ts';

// interface State {
//   results: CardInfo[];
//   isLoading: boolean;
//   error: string | null;
//   total: number;
// }

function App(){
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(SEARCH_KEY, '');
  const [page, setPage] = useState(1);
  const {results, total, isLoading, error} = usePokemon(searchTerm, page);

  function handleSearch (term: string) {
    if (term !== searchTerm) {
      setSearchTerm(term);
      setPage(1);
    }
  };

  function handlePageChange (newPage: number) {
    setPage(newPage);
  };

  return (
      <div>
        <SearchBar
          initialTerm={searchTerm}
          onSearch={handleSearch}
        ></SearchBar>
        <CardsList
          results={results}
          isLoading={isLoading}
          error={error}
        ></CardsList>
        <Pagination
          page={page}
          totalPages={Math.ceil(total / PAGE_SIZE)}
          onPageChange={handlePageChange}
        />
        <ErrorButton>Throw Error</ErrorButton>
      </div>
    );
}

export default App;
