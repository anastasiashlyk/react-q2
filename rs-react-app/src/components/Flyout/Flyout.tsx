import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../store/selectedItemsSlice';
import { RootState } from '../../store/store';
import './index.css';

function Flyout() {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems);

  if (selectedItems.length === 0) return null;

  function handleDownload() {
    const header = 'name,height,weight,id';
    const rows = selectedItems.map(
      (item) => `${item.name},${item.height},${item.weight},${item.id}`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedItems.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flyout">
      <span className="flyout-count">{selectedItems.length} item(s) selected</span>
      <div className="flyout-actions">
        <button onClick={() => dispatch(clearAll())}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default Flyout;
