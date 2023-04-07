import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../Components/ErrorMessage';
import { regNickname, regPassword, regTelephone } from '../Components/regular';
import { registration } from '../http/userAPI';
import '../styles/all_style.css';

export default function Reg() {
  const router = useHistory();
  const regexNickname = regNickname;
  const regexTel = regTelephone;
  const regexPassword = regPassword;
  const [errorMessage, setErrorMessage] = useState("");
  const [submitButton, setSubmitButton] = useState(true);
  
  const [nickname, setNickname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [fPassword, setFPassword] = useState("");
  const [sPassword, setSPassword] = useState("");

  useEffect(() => {
    if((regexNickname.test(nickname)) && (regexTel.test(telephone)) && ((regexPassword.test(fPassword)) && (regexPassword.test(sPassword)) && (fPassword === sPassword))) {
      setSubmitButton(false);
    }else {
      setSubmitButton(true);
    }
  }, [nickname, telephone, fPassword, sPassword]);

  const confirmButton = async () => {
    try {
      const response = await registration(telephone, fPassword, nickname);
      if (response.status === 201) {
        //localStorage.setItem("userID", response.data.id);
        localStorage.setItem("myNickname", nickname);
        localStorage.setItem("telephone", telephone);
        router.push("/confirm");
      }
    }catch (e) {
      console.log(e.message);
      console.log(e.response.data.detail[0].msg);
      setErrorMessage(e.response.data.detail[0].msg)
    }
  };

  function loginButton(){
    router.push("/login");
  };

  return (
    <div>
      <div className="window">
          <div className="window_content">
              <h1 className="main_title">Регистрация</h1>
              <div className="login_form">
                  <input type="text" value={nickname} className="nickname intext" placeholder="Никнейм" pattern='^[a-zA-Z]+$' required onChange={e => setNickname(e.target.value)}/><br/>
                  <input type="tel" value={telephone} minLength="12" maxLength="12" className="telephone intext" placeholder="Номер телефона" pattern='^[0-9]{11}$' required onChange={e => setTelephone(e.target.value)}/><br/>
                  <input type="password" value={fPassword} minLength="8" className="password intext" placeholder="Пароль" required onChange={e => setFPassword(e.target.value)}/><br/>
                  <input type="password" value={sPassword} minLength="8" className="password_repeat intext" placeholder="Повтор пароля" required onChange={e => setSPassword(e.target.value)}/><br/>
                  <button type="submit" name="form_button" className="form_button butt" disabled={submitButton} onClick={confirmButton}>Зарегистрироваться</button>
              </div>
              <ErrorMessage error={errorMessage}/>
              <button type="button" className="other_page_dowload butt" onClick={loginButton}>Авторизация</button>
          </div>
      </div>
    </div>
  )
}
