import { useState, type JSX } from 'react';
import '../style/App.scss';
import Form from './components/forms/form';
import Modal from './components/modal/modal';
import FormWithReactHook from './components/forms/formWithReactHook';
import { createPortal } from 'react-dom';

interface ModalState {
  formComponent: (() => JSX.Element) | null;
}

export default function App(): JSX.Element {
  const [modalState, setModalState] = useState<ModalState>({
    formComponent: null,
  });

  const CurrentForm = modalState.formComponent;

  const onOpen = (formComponent: () => JSX.Element) => {
    setModalState({ formComponent });
  };

  const onClose = () => {
    setModalState({ formComponent: null });
  };

  return (
    <>
      <h1>Forms</h1>
      <div className="wrapper">
        <button
          className="form-button"
          type="button"
          onClick={() => onOpen(Form)}
        >
          Form
        </button>
        <button
          className="form-button"
          type="button"
          onClick={() => onOpen(FormWithReactHook)}
        >
          Form with React Hook
        </button>
      </div>
      {CurrentForm &&
        createPortal(
          <Modal onClose={onClose}>
            <CurrentForm />
          </Modal>,
          document.body
        )}
    </>
  );
}
