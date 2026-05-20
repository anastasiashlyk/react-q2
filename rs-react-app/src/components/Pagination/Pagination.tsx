import './index.css';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

function Pagination(props: Props) {
  function handlePageChangeRight() {
    const { page, totalPages, onPageChange } = props;
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      onPageChange(nextPage);
    }
  }

  function handlePageChangeLeft() {
    const { page, onPageChange } = props;
    const nextPage = page - 1;
    if (nextPage > 0) {
      onPageChange(nextPage);
    }
  }

  return (
    <div className="pagination">
      <button onClick={handlePageChangeLeft} disabled={props.page <= 1}>
        <GrFormPreviousLink />
      </button>
      <span>
        Page {props.page} of {props.totalPages}
      </span>
      <button
        onClick={handlePageChangeRight}
        disabled={props.page >= props.totalPages}
      >
        <GrFormNextLink />
      </button>
    </div>
  );
}

export default Pagination;
