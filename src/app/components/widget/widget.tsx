import { useCallback, useContext, useRef, useState } from 'react';
import '../../../styles/Widget.scss';
import WidgetDialog from './dialog';
import { CountriesCO2Context } from '../../../utils/context';

export default function Widget() {
  const { setViewColumns, viewColumns } = useContext(CountriesCO2Context);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = useCallback(() => {
    if (!dialogRef.current) {
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
      dialogRef.current.show();
    } else {
      setIsOpen(false);
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <div className="widget">
      <button onClick={toggleDialog}>Widget</button>
      <WidgetDialog
        setViewColumns={setViewColumns}
        viewColumns={viewColumns}
        toggleDialog={toggleDialog}
        dialogRef={dialogRef}
      />
    </div>
  );
}
