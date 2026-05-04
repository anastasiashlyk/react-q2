import React from "react";
import "./index.css"
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}


class Pagination extends React.Component<Props>{

  handlePageChangeRight = () =>{
    const {page, totalPages, onPageChange} = this.props;
    const nextPage = page + 1;
    if (nextPage <= totalPages){
      onPageChange(nextPage);
    }
  }

  handlePageChangeLeft = () =>{
    const {page, onPageChange} = this.props;
    const nextPage = page - 1;
    if (nextPage > 0){
      onPageChange(nextPage);
    }
  }
  render(){
    return (
      <div className="pagination">
        <button onClick={this.handlePageChangeLeft}
        disabled={this.props.page <= 1}><GrFormPreviousLink /></button>
        <span>Page {this.props.page} of {this.props.totalPages}</span>
        <button 
        onClick={this.handlePageChangeRight}
        disabled={this.props.page >= this.props.totalPages}><GrFormNextLink /></button>
      </div>
    )
  }
}

export default Pagination;