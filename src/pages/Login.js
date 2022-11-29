import React, { useState } from 'react';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleFormValidation = () => {
    const { email, password } = form;
    return !(/.+@.+\.[A-Za-z]+$/.test(email) && /^(?=.*\d).{7,}$/.test(password));
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
          >
            Enter

          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
