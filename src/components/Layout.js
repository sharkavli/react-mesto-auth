import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import HeaderLog from './HeaderLog';
import HeaderReg from './HeaderReg';

export default function Layout({ email, setEmail, setLoggin }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Header setLoggin={setLoggin} setEmail={setEmail} email={email} />
        }
      >
        <Route path="sign-up" element={<HeaderLog />} />
        <Route path="sign-in" element={<HeaderReg />} />
      </Route>
    </Routes>
  );
}
