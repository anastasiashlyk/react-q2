import './App.css'
import React from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import CardsList from './components/CardsList/CardsList'
import Pagination from './components/Pagination/Pagination'

import { CardInfo } from './types/pokeapi_types'
import {getPokemonByName, getPokemonList} from './api/requests'

import {SEARCH_KEY, PAGE_SIZE} from './constants/consts'

interface State {
  results: CardInfo[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  page: number;
  total: number;
}



class App extends React.Component<object, State> {
  state: State = {
    results: [],
    searchTerm: localStorage.getItem(SEARCH_KEY) ?? '',
    isLoading: false,
    error: null,
    page: 1,
    total: 0
  }

  async componentDidMount(): Promise<void> {
    this.loadData(this.state.searchTerm, this.state.page);
  }

  loadData = async (term: string, page: number) => {
    this.setState({isLoading: true, error: null});
    try{
      const data = term ? await getPokemonByName(term) : await getPokemonList(PAGE_SIZE, (page -1 )*PAGE_SIZE);
      this.setState({results: data.items, isLoading: false, total: data.total});
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      this.setState({
        results: [],
        isLoading: false,
        error: `Could not load data: ${message}`,
      });
    }
    
    
  }

  handleSearch = (term: string) => {
    if(term !== this.state.searchTerm){
      localStorage.setItem(SEARCH_KEY, term)
      this.setState({searchTerm: term, page: 1});
      this.loadData(term, 1);
    }
  }

  handlePageChange = (newPage: number) => {
    this.setState({page: newPage});
    this.loadData(this.state.searchTerm, newPage);
  }
  render(){
    return (
      <div>
        <SearchBar initialTerm={this.state.searchTerm} onSearch={this.handleSearch}></SearchBar>
        <CardsList results={this.state.results} isLoading={this.state.isLoading} error={this.state.error}></CardsList>
        <Pagination 
          page={this.state.page}
          totalPages={Math.ceil(this.state.total / PAGE_SIZE)}
          onPageChange={this.handlePageChange}
        />
      </div>

    )
  }

}

export default App
