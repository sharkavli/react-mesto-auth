import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../auth';
import React from 'react';

export const Register = (props) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  const handleShowSuccesTool = () => {
    props.onShow(true);
    props.onSucces(true);
    props.onText('Вы успешно зарегистрировались!');
  };

  const handleShowErrorTool = () => {
    props.onShow(true);
    props.onSucces(false);
    props.onText('Что-то пошло не так! Попробуйте ещё раз.');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    auth.register(password, email).then((res) => {
      if (res) {
        handleShowSuccesTool();
        navigate('/sign-in', { replace: true });
      } else {
        handleShowErrorTool();
        console.log(res);
      }
    });
  };

  return (
    <div className="sign-up">
      <div className="sign-up__container">
        <h1 className="sign-up__title">Регистрация</h1>
        <form className="sign-up__form">
          <input
            onChange={handleChange}
            placeholder="Email"
            className="sign-up__input"
            required
            name="email"
            type="email"
            value={formValue.email}
          ></input>
          <input
            onChange={handleChange}
            placeholder="Пароль"
            className="sign-up__input"
            required
            name="password"
            type="password"
            value={formValue.password}
          ></input>
          <button
            onClick={handleSubmit}
            type="submit"
            className="sign-up__submit"
          >
            Зарегестрироваться
          </button>
        </form>
        <div className="sign-up__text-container">
          <p className="sign-up__info-text">Уже зарегестрированы?</p>
          <Link to="/sign-in" className="sign-up__link">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
