import React from 'react';
import * as auth from '../auth';
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

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
    auth.authorize(password, email).then((res) => {
      if (res.token) {
        navigate('/', { replace: true });
        localStorage.setItem('jwt', res.token);
        props.setEmail(email);
        props.onLog(true);
      }
    });
  };

  return (
    <div className="sign-up">
      <div className="sign-up__container">
        <h1 className="sign-up__title">Вход</h1>
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
