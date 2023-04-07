import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/all_style.css';
import { request } from '../http/userAPI';
import ErrorMessage from '../Components/ErrorMessage';
import { regTelephone } from '../Components/regular';

export default function ChangePassword() {
  const router = useHistory();
  const regexTel = regTelephone;
  const [telephone, setTelephone] = useState("");
  const [submitButton, setSubmitButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(regexTel.test(telephone)) {
      setSubmitButton(false);
    }else {
      setSubmitButton(true);
    }
  }, [telephone]);

  const completeButton = async () => {
    try {
      const response = await request(telephone);
      if (response.status === 200) {
        localStorage.setItem("myTelephone", telephone);
        router.push("/confirm_change");
      }
    }catch (e) {
      setErrorMessage(e.response.data.detail[0].msg)
    }
  };

  return (
    <div>
        <div className="window">
            <div className="window_content">
                <h1 className="main_title">Восстановление пароля</h1>
                <div className="login_form">
                    <div className="inform_confitm">
                        Введите номер телефона
                    </div>
                    <input type="tel" value={telephone} minLength="12" maxLength="12" className="code intext" placeholder="Номер телефона" pattern='^\+[0-9]{11}$' required onChange={e => setTelephone(e.target.value)}/><br/>
                    <button type="submit" name="form_button" className="form_button butt" onClick={completeButton} disabled={submitButton}>Подтвердить</button>
                    <div>
                        <span className="noauth_span" onClick={() => router.push("/login")}>Вернуться на вход</span>
                    </div>
                </div>
                <ErrorMessage error={errorMessage}/>
            </div>
        </div>
    </div>
  )
}
