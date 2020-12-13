import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import UserContext from "../../tech/context/UserContext";

const emptyCredentials = {
  username: '',
  password: '',
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function LoginPage() {
  const { loginWithUserCredentials } = useContext(UserContext);
  const [credentials, setCredentials] = useState(emptyCredentials);
  const [error, setError] = useState('');
  const history = useHistory();
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PageLayout>

        {windowDimensions.width <= 375 &&
          <ImgStyled alt="movies" src="/background_movies.jpg" height="667px" width="100%" />
        }

        <ForegroundGrid>

          <HeaderStyled>
            <TitleStyled>dub</TitleStyled>
            <SubtitleStyled>Who's speaking?</SubtitleStyled>
          </HeaderStyled>

          <Form onSubmit={handleSubmit}>
            <label>Username<input name="username" value={credentials.username} onChange={handleChange} type="text"/></label>
            <label>Password<input name="password" value={credentials.password} onChange={handleChange} type="password"/></label>
            {error && <p>{error}</p>}
            <button>Login</button>
          </Form>

        </ForegroundGrid>
    </PageLayout>
  );

  function handleSubmit(event) {
    event.preventDefault();
    loginWithUserCredentials(credentials)
      .then(() => history.push('/'))
      .catch(() => setError('Unknown username or password.'));
  }

  function handleChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }
}

const PageLayout = styled.div`
  position: relative;
`;

const ImgStyled = styled.img`
  position: absolute;
  opacity: 0.3;
  filter: alpha(opacity=40);
`;

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const TitleStyled = styled.div`
  font-size: 6em;
`;

const SubtitleStyled = styled.div`
  font-size: 2em;
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: var(--size-l);
  color: white;

  input {
    display: block;
    border-radius: var(--border-round);
    border: none;
    width: 300px;
  }

  button {
    padding: var(--size-m);
    border: none;
    background: var(--blue-main);
    color: white;
    border-radius: var(--size-s);
    font-size: 1em;
    font-weight: bold;
  }
`;

const ForegroundGrid = styled.div`
  position: absolute;
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
`;
