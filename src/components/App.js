import Main from './Main.js';
import Footer from './Footer.js';
import React, { useState } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import DeletePopup from './DeletePopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.js';
import { Login } from './Login.js';
import { LoggedContext } from '../contexts/LoggedContext.js';
import { Register } from './Register.js';
import { InfoTooltip } from './InfoTooltip.js';
import Layout from './Layout.js';
import * as auth from '../auth';

function App() {
  const navigate = useNavigate();
  const [isloadingPage, setIsLoadingPage] = useState(true);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState('');
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInfoTool, setShowInfoTool] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [infoSucces, setInfoSucces] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCardsInfo()])
      .then((res) => {
        setCurrentUser(res[0]);
        setCards(res[1]);
        setIsLoadingPage(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  React.useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.getToken(jwt).then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        });
      }
    }
  }

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    try {
      const newCard = await api.toggleLike(card._id, isLiked);
      setCards(cards.map((item) => (item._id === card._id ? newCard : item)));
    } catch (err) {
      console.log(`Ошибка: ${err}`);
    }
  };

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        const newCards = cards.filter((card) => card._id !== cardId);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setNewAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardClick(name, link) {
    setSelectedCard({ name, link });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleDeleteCardClick(cardId) {
    setCardToDelete(cardId);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardToDelete(null);
    setSelectedCard({ name: '', link: '' });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedContext.Provider value={loggedIn}>
        <div className="App">
          <div className="page">
            <div className="page__container">
              <Layout
                setLoggin={setLoggedIn}
                setEmail={setUserEmail}
                email={userEmail}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute
                      isloadingPage={isloadingPage}
                      onDeletePopup={handleDeleteCardClick}
                      setCards={setCards}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardClick={handleCardClick}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      element={Main}
                    />
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <Register
                      onSucces={setInfoSucces}
                      onText={setInfoText}
                      onShow={setShowInfoTool}
                    />
                  }
                />
                <Route
                  path="/sign-in"
                  element={
                    <Login
                      setEmail={setUserEmail}
                      onLog={setLoggedIn}
                      onShow={setShowInfoTool}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              {showInfoTool && (
                <InfoTooltip
                  succes={infoSucces}
                  text={infoText}
                  onShow={setShowInfoTool}
                />
              )}
              {loggedIn && <Footer />}
              <EditAvatarPopup
                onUpdateAvatar={handleUpdateAvatar}
                onClose={closeAllPopups}
                isOpen={isEditAvatarPopupOpen}
              />
              <EditProfilePopup
                onUpdateUser={handleUpdateUser}
                onClose={closeAllPopups}
                isOpen={isEditProfilePopupOpen}
              />
              <AddPlacePopup
                cards={cards}
                onAddPlace={handleAddPlaceSubmit}
                onClose={closeAllPopups}
                isOpen={isAddPlacePopupOpen}
              />
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <DeletePopup
                cardId={cardToDelete}
                onClose={closeAllPopups}
                onCardDelete={handleCardDelete}
              />
            </div>
          </div>
        </div>
      </LoggedContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
