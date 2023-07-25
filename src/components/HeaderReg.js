import { Link } from 'react-router-dom';

export default function HeaderReg() {
  return (
    <Link to="/sign-up" className="header__link">
      Регистрация
    </Link>
  );
}
