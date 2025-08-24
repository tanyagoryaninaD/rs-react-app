import { useState, type JSX } from 'react';
import '../style/App.scss';
import Form from './components/forms/form';
import Modal from './components/modal/modal';
import FormWithReactHook from './components/forms/formWithReactHook';
import type { FormProps } from '../types/common';
import { useFormStore } from './store/useFormStore';
import Profile from './components/profile/Profile';

interface ModalState {
  formComponent: ((props: FormProps) => JSX.Element) | null;
}

export default function App(): JSX.Element {
  const [modalState, setModalState] = useState<ModalState>({
    formComponent: null,
  });
  const { forms } = useFormStore((state) => state);

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
          onClick={() => onOpen(() => <Form onClose={onClose} />)}
        >
          Form
        </button>
        <button
          className="form-button"
          type="button"
          onClick={() => onOpen(() => <FormWithReactHook onClose={onClose} />)}
        >
          Form with React Hook
        </button>
      </div>
      {!!forms.length &&
        forms
          .map((form, index, arr) => {
            return (
              <Profile
                key={form.email}
                data={form}
                last={index === arr.length - 1}
              />
            );
          })
          .reverse()}
      <Modal isOpen={!!modalState.formComponent} onClose={onClose}>
        {CurrentForm && <CurrentForm onClose={onClose} />}
      </Modal>
    </>
  );
}
