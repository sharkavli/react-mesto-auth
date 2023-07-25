import PopupWithForm from './PopupWithForm';
import React, { useRef } from 'react';

function EditAvatarPopup(props) {
  let avatarInput = useRef('');

  React.useEffect(() => {
    avatarInput.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="EditAvatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <input
        ref={avatarInput}
        required
        name="link"
        className="popup__input popup__input-avatar"
        type="url"
        placeholder="Ссылка на картинку"
      />
      <span id="inputAvatarLink-error" className="popup__error-message"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
