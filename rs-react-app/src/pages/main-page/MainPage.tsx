import SearchBar from '../../components/SearchBar/SearchBar';
import CardsList from '../../components/CardsList/CardsList';
import Pagination from '../../components/Pagination/Pagination';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import { Outlet, useSearchParams } from 'react-router-dom';

import { SEARCH_KEY, PAGE_SIZE } from '../../constants/consts';

import useLocalStorage from '../../hooks/useLocalStorage.ts';
import usePokemon from '../../hooks/usePokemon.ts';

import './index.css';

function MainPage() {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>(SEARCH_KEY, '');
  const [searchParams, setSearchParams] = useSearchParams();
  // const [page, setPage] = useState(1);
  const { results, total, isLoading, error } = usePokemon(
    searchTerm,
    Number(searchParams.get('page') || 1)
  );

  function handleSearch(term: string) {
    if (term !== searchTerm) {
      setSearchTerm(term);
      setSearchParams((prev) => {
        prev.set('page', '1');
        return prev;
      });
    }
  }

  function handlePageChange(newPage: number) {
    setSearchParams((prev) => {
      prev.set('page', String(newPage));
      return prev;
    });
  }

  return (
    <div>
      <SearchBar initialTerm={searchTerm} onSearch={handleSearch}></SearchBar>
      <div className="content">
        <div className="content-list">
          <CardsList
            results={results}
            isLoading={isLoading}
            error={error}
            currentPage={Number(searchParams.get('page'))}
          ></CardsList>
        </div>
        <Outlet />
      </div>

      <Pagination
        page={Number(searchParams.get('page'))}
        totalPages={Math.ceil(total / PAGE_SIZE)}
        onPageChange={handlePageChange}
      />
      <ErrorButton></ErrorButton>
    </div>
  );
}

export default MainPage;
