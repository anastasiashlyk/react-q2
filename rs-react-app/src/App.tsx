import './App.css'
import React from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import CardsList from './components/CardsList/CardsList'

import { CardInfo } from './types/pokeapi_types'
import {getPokemonByName, getPokemonList} from './api/requests'

import { SEARCH_KEY } from './constants/consts'

interface State {
  results: CardInfo[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}



class App extends React.Component<object, State> {
  state: State = {
    results: [],
    searchTerm: localStorage.getItem(SEARCH_KEY) ?? '',
    isLoading: false,
    error: null
  }

  async componentDidMount(): Promise<void> {
    this.loadData(this.state.searchTerm);
  }

  loadData = async (term: string) => {
    this.setState({isLoading: true, error: null});
    try{
      const data = term ? [await getPokemonByName(term)] : await getPokemonList(10, 0);
      this.setState({results: data, isLoading: false});
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
      this.setState({searchTerm: term});
      this.loadData(term);
    }
  }

  render(){
    return (
      <div>
        <SearchBar initialTerm={this.state.searchTerm} onSearch={this.handleSearch}></SearchBar>
        <CardsList results={this.state.results} isLoading={this.state.isLoading} error={this.state.error}></CardsList>

      </div>

    )
  }

}

export default App
