import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { CheckIcon, MenuIcon, CloseIcon, MoonIcon, SunIcon } from './Icons';
import styles from './styles/Header.module.css';
import useTheme from '../../hooks/useTheme';
import { useAuthContext } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuthContext();
  const [theme, setTheme] = useTheme();
  const [sideNav, setSideNav] = useState<boolean>(false);
  const sideNavRef = useRef(null);

  return (
    <header className={styles.Header}>
      <div className={styles.container}>
        <Link to='/' className={styles.logo}>
          <div>
            <CheckIcon className={styles.icon} />
            <span>ToDo App</span>
          </div>
        </Link>
        <div className={styles.buttonContainer}>
          <button
            className='p-0 sm:mr-4'
            aria-label='Change theme'
            onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button aria-label='Open mobile navbar' onClick={() => setSideNav(!sideNav)}>
            {sideNav ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <nav className={styles.nav}>
          <button
            className='p-0 sm:mr-4'
            aria-label='Change theme'
            onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <Link to='/'>Inicio</Link>
          <Link to='/sobre'>Sobre</Link>
          {user ? (
            <>
              <Link to='/categorias'>Categorias</Link>
              <Link
                to='/login'
                onClick={() => {
                  if (logout) logout();
                }}>
                Sair
              </Link>
            </>
          ) : (
            <Link to='/login'>Login</Link>
          )}
        </nav>
        <CSSTransition
          in={sideNav}
          timeout={150}
          nodeRef={sideNavRef}
          unmountOnExit
          classNames={{
            enter: styles.sideNavEnter,
            enterActive: styles.sideNavEnterActive,
            exit: styles.sideNavExit,
            exitActive: styles.sideNavExitActive
          }}>
          <div ref={sideNavRef} className={styles.sideNav}>
            <nav>
              <Link to='/' onClick={() => setSideNav(!sideNav)}>
                Inicio
              </Link>
              <Link to='/sobre' onClick={() => setSideNav(!sideNav)}>
                Sobre
              </Link>
              {user ? (
                <>
                  <Link to='/categorias'>Categorias</Link>
                  <Link
                    to='/login'
                    onClick={() => {
                      if (logout) logout();
                    }}>
                    Sair
                  </Link>
                </>
              ) : (
                <Link to='/login' onClick={() => setSideNav(!sideNav)}>
                  Login
                </Link>
              )}
            </nav>
          </div>
        </CSSTransition>
      </div>
    </header>
  );
};

export default Header;
