import succesful from '../images/succesful.png';
import error from '../images/error.png';

export const InfoTooltip = ({ succes, text, onShow }) => {
  function handleClose() {
    onShow(false);
  }

  console.log(succes);
  return (
    <div className="info-window">
      <div className="info-window__container">
        <img
          alt={text}
          className="info-window__img"
          src={succes ? succesful : error}
        ></img>
        <p className="info-window__text">{text}</p>
        <button onClick={handleClose} className="popup__close"></button>
      </div>
    </div>
  );
};
