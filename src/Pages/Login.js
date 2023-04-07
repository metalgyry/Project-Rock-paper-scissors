import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../Components/ErrorMessage';
import { regPassword, regTelephone } from '../Components/regular';
import { login } from '../http/userAPI';
import '../styles/all_style.css';

export default function Login() {
  const router = useHistory();
  if( localStorage.getItem("token") ) {
    router.push("/main");
  }
  const regexTel = regTelephone;
  const regexPassword = regPassword;
  const [submitButton, setSubmitButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if((regexTel.test(telephone)) && (regexPassword.test(password))) {
      setSubmitButton(false);
    }else {
      setSubmitButton(true);
    }
  }, [telephone, password]);

  function regButton(){
    router.push("/reg");
  };

  const loginButton = async () => {
    try {
      const form = new FormData();
      form.append("username" , telephone);
      form.append("password" , password);
      const response = await login(form); // telephone, password
      if (response.status === 200) {
        localStorage.setItem("userID", response.data.user.id);
        localStorage.setItem("myNickname", response.data.user.nickname);
        localStorage.setItem("token", response.data.access_token);
        router.push("/main");
      }
    }catch (e) {
      //setErrorMessage(e.message);
      setErrorMessage(e.response.data.detail[0].msg)
    }
  };

  return (
    <div className="window">
        <div className="window_content">
            <h1 className="main_title">Авторизация</h1>
            <div className="login_form">
                <input type="tel" value={telephone} minLength="12" maxLength="12" className="telephone intext" placeholder="Номер телефона" pattern='^\+[0-9]{11}$' required onChange={e => setTelephone(e.target.value)}/><br/>
                <input type="password" value={password} minLength="8" className="password intext" placeholder="Пароль" required onChange={e => setPassword(e.target.value)}/><br/>
                <button type="submit" name="form_button" className="form_button butt" onClick={loginButton} id="submitButton" disabled={submitButton}>Войти</button>
            </div>
            <ErrorMessage error={errorMessage}/>
            <button type="button" className="other_page_dowload butt" onClick={regButton}>Регистрация</button>
            <div>
              <span className="noauth_span" onClick={() => router.push("/change_pass")}>Забыли пароль?</span>
            </div>
        </div>
    </div>
  )
}
