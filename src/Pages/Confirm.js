import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/all_style.css';
import { confirm } from '../http/userAPI';
import ErrorMessage from '../Components/ErrorMessage';
import { regCode } from '../Components/regular';

export default function Confirm() {
  const router = useHistory();
  const regexCode = regCode;
  const [submitButton, setSubmitButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [code, setCode] = useState("");

  useEffect(() => {
    if(regexCode.test(code)) {
      setSubmitButton(false);
    }else {
      setSubmitButton(true);
    }
  }, [code]);

  const completeButton = async () => {
    try {
      let telephone = localStorage.getItem("telephone");
      localStorage.removeItem("telephone");
      const response = await confirm(telephone, code);
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
                <h1 className="main_title">Подтверждение</h1>
                <div className="login_form">
                    <div className="inform_confitm">
                        Введите последние <br/> 4 цифры номера <br/> входящего звонка
                    </div>
                    <input type="text" minlength="4" maxlength="4" className="code intext" placeholder="Код" pattern='^[0-9]{4}$' required onChange={e => setCode(e.target.value)}/><br/>
                    <button type="submit" name="form_button" className="form_button butt" onClick={completeButton} disabled={submitButton}>Подтвердить</button>
                </div>
                <ErrorMessage error={errorMessage}/>
            </div>
        </div>
    </div>
  )
}
