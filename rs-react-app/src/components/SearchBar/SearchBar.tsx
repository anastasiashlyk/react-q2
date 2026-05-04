import React from "react";
import { ChangeEvent, FormEvent } from "react";
import "./index.css";

interface Props {
  initialTerm: string;
  onSearch: (term: string) => void;
}

interface State {
  value: string;
}

class SearchBar extends React.Component<Props, State> {
  state: State = {
    value: this.props.initialTerm,
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = this.state.value.trim();
    this.props.onSearch(msg);
  };
  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <input
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Search Pokémon by name..."
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;
