import React, { useCallback, useEffect, useState } from "react";
import { login, isValidEmail, getUsers } from "../../helper";
import { UserDialog, MyButton } from "../../components";
import { loginFormShape, userShape } from "../../interfaces";
import "./LoginPage.css";

const styles = {
  ellipsisContainer: {
    maxWidth: "100%",
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

const LoginPage = () => {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [myform, setMyForm] = useState<loginFormShape>({
    email: "",
    password: "",
  });

  const onIncPressed = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    console.log(
      "onIncPressed with useCallback function will only render 1 time even component re-render",
      onIncPressed
    );
  }, [onIncPressed]);

  const onDialogVisibilityPressed = () => {
    setDialogVisibility(!dialogVisibility);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMyForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(myform.email)) {
      alert("Please input valid email");
    } else {
      try {
        setPasswordVisibility(false);
        setLoading(true);
        const response = await login(myform);
        setToken(response.data?.accessToken);
      } catch (err: any) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const onClearTokenPressed = () => {
    setToken("");
    setMyForm({
      email: "",
      password: "",
    });
  };

  return (
    <div className='login-container'>
      <UserDialog
        visibility={dialogVisibility}
        onRequestClose={onDialogVisibilityPressed}
      />

      <form onSubmit={handleSubmit}>
        <div className='primary-input-container'>
          <input
            id='email'
            name='email'
            type='text'
            placeholder='Type your email..'
            className='primary-input'
            value={myform.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='primary-input-container'>
          <input
            id='password'
            name='password'
            className='primary-input'
            placeholder='Type your password..'
            type={passwordVisibility ? "text" : "password"}
            value={myform.password}
            onChange={handleChange}
            required
          />
          <span
            className='toggle-password-visibility'
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          >
            {passwordVisibility ? "👀" : "🙈"}
          </span>
        </div>
        <MyButton type='submit' loading={loading} caption='Login' />
      </form>

      {token != "" ? (
        <div>
          <div className='center'>
            <button
              onClick={onIncPressed}
              type='button'
              className='primary-button'
              disabled={loading}
            >
              {`${count} Increment with useCallback`}
            </button>
          </div>
          <div style={styles.ellipsisContainer}>
            <span>Login success with token: {token} </span>
          </div>
          <MyButton
            onPressed={onClearTokenPressed}
            type='button'
            caption='Clear token'
          />
        </div>
      ) : (
        <MyButton
          onPressed={onDialogVisibilityPressed}
          type='button'
          caption='List User'
          loading={loading}
        />
      )}
    </div>
  );
};

export default LoginPage;
