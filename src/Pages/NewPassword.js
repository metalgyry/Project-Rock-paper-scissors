import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/all_style.css';
import { newPassword } from '../http/userAPI';
import ErrorMessage from '../Components/ErrorMessage';
import { regPassword } from '../Components/regular';

export default function NewPassword() {
  const router = useHistory();
  const regexPassword = regPassword;
  const [password, setPassword] = useState("");
  const [submitButton, setSubmitButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(regexPassword.test(password)) {
      setSubmitButton(false);
    }else {
      setSubmitButton(true);
    }
  }, [password]);

  const completeButton = async () => {
    try {
      let certificate = localStorage.getItem("certificate");
      localStorage.removeItem("certificate");
      const response = await newPassword(certificate, password);
      if (response.status === 200) {
        router.push("/login");
      }
    }catch (e) {
      setErrorMessage(e.response.data.detail[0].msg)
    }
  };

  return (
    <div>
        <div className="window">
            <div className="window_content">
                <h1 className="main_title">Новый пароль</h1>
                <div className="login_form">
                    <div className="inform_confitm">
                        Введите новый пароль
                    </div>
                    <input type="password" value={password} minLength="8" className="code intext" placeholder="Пароль" required onChange={e => setPassword(e.target.value)}/><br/>
                    <button type="submit" name="form_button" className="form_button butt" onClick={completeButton} disabled={submitButton}>Подтвердить</button>
                </div>
                <ErrorMessage error={errorMessage}/>
            </div>
        </div>
    </div>
  )
}
