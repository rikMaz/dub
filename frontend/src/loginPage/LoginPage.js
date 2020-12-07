import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const emptyCredentials = {
  username: '',
  password: '',
};

export default function LoginPage() {
  const { loginWithUserCredentials } = useContext(UserContext);
  const [credentials, setCredentials] = useState(emptyCredentials);
  const [error, setError] = useState('');
  const history = useHistory();
  return (
    <>
      <div title="Login" />
      <Main>
        <Form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              name="username"
              value={credentials.username}
              onChange={handleChange}
              type="text"
            />
          </label>
          <label>
            Password
            <input
              name="password"
              value={credentials.password}
              onChange={handleChange}
              type="password"
            />
          </label>
          {error && <p>{error}</p>}
          <button>Login</button>
        </Form>

      </Main>
    </>
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

const Main = styled.main`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--size-l);
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: var(--size-l);

  input {
    display: block;
    width: 100%;
  }

  button {
    padding: var(--size-m);
    border: none;
    background: var(--blue-main);
    color: white;
    border-radius: var(--size-s);
    font-size: 1em;
    font-weight: 600;
  }
`;
