import { useState } from "react";
import { useLoginMutation } from "../../store/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { typeUser } from "../../types/types";
import s from "./Authorization.module.scss";
import MyInput from "../../shared/MyInput/MyInput";
import MyButton from "../../shared/MyButton/MyButton";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Authorization = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e?: React.MouseEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      if (result) {
        dispatch(
          setUser({
            token: result.token,
            name: result.name,
            email: result.email,
          } as typeUser)
        );
        navigate("/quests/today");
      }

      // Успешный вход
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className={s.auth}>
      <form className={s.authForm}>
        <div className={s.authTitle}>Войти</div>
        <MyInput
          type="email"
          placeholder="Почта"
          autoComplete="on"
          value={email}
          className={isLoading ? `${s.authInput}:disabled` : s.authInput}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        {error ? <div className={s.error}>{error.error}</div> : null}
        <MyInput
          type="password"
          placeholder="Пароль: 6-32 символа"
          value={password}
          autoComplete="on"
          className={isLoading ? `${s.authInput}:disabled` : s.authInput}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />

        <MyButton
          disabled={isLoading}
          onClick={(e?: React.MouseEvent) => handleLogin(e)}
          color={"blue"}
        >
          {isLoading ? "Вход..." : "Вход"}
        </MyButton>

        <div className={s.privacyPolicy}>
          Регистрируясь, вы соглашаетесь с нашими{" "}
          <u>
            <a
              className={s.condition}
              target="_blank"
              href="https://ticktick.com/tos"
            >
              Условиями использования
            </a>
          </u>{" "}
          и{" "}
          <u>
            {" "}
            <a
              className={s.condition}
              target="_blank"
              href="https://ticktick.com/privacy"
            >
              Политикой конфиденциальности
            </a>
          </u>
          .
        </div>

        <MyButton className={s.authBtn}>
          <FcGoogle className={s.authBtnLogo} /> Продолжить с Google
        </MyButton>

        <MyButton className={s.authBtn}>
          <FaApple className={s.authBtnLogo} /> Продолжить с Apple
        </MyButton>
      </form>
    </div>
  );
};

export default Authorization;
