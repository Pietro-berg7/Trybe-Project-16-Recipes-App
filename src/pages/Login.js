import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    history.push('/rota');
  };
  return (
    <main className="login-main">
      <section>
        <form>
          <input
            placeholder="Email"
            type="email"
            data-testid="email-input"
            name="email"
            value={ form.email }
            onChange={ ({ target }) => setForm({ ...form, [target.name]: target.value }) }
          />
          <input
            placeholder="Password"
            type="password"
            data-testid="password-input"
            name="password"
            value={ form.password }
            onChange={ ({ target }) => setForm({ ...form, [target.name]: target.value }) }
          />
          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={ handleFormValidation() }
            onClick={ handleLogin }
          >
            Enter

          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
