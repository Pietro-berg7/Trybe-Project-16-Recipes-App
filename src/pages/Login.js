import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Main, Section, Input, Button, LogoDiv } from './CSS/Login.styled';

function Login() {
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleFormValidation = () => {
    const { email, password } = form;
    return !(/.+@.+\.[A-Za-z]+$/.test(email) && /^(?=.*\d).{7,}$/.test(password));
  };

  const handleLogin = () => {
    const { email } = form;
    window.localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };
  return (
    <Main>
      <Section>
        <LogoDiv>
          <p>
            Trybe
          </p>
          <h1>
            Recipes app
          </h1>
        </LogoDiv>
        <form>
          <Input
            placeholder="Email"
            type="email"
            data-testid="email-input"
            name="email"
            value={ form.email }
            onChange={ ({ target }) => setForm({ ...form, [target.name]: target.value }) }
          />
          <Input
            placeholder="Password"
            type="password"
            data-testid="password-input"
            name="password"
            value={ form.password }
            onChange={ ({ target }) => setForm({ ...form, [target.name]: target.value }) }
          />
          <Button
            data-testid="login-submit-btn"
            type="button"
            disabled={ handleFormValidation() }
            onClick={ handleLogin }
          >
            Enter

          </Button>
        </form>
      </Section>
    </Main>
  );
}

export default Login;
