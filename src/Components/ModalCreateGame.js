import React, { useState, useEffect } from 'react'
import '../styles/all_style.css';
import ErrorMessage from '../Components/ErrorMessage';
import { useHistory } from 'react-router-dom';
import { lobbyCreate } from '../http/userAPI';
import st from './ModalCreateGame.module.css';
import { regexName } from './regular';

export default function ModalCreateGame( {visible, setVisible}) {
    const router = useHistory();
    const regName = regexName;
    const [errorMessage, setErrorMessage] = useState("");
    const [submitButton, setSubmitButton] = useState(true);

    const [maxGames, setMaxGames] = useState(1);
    const [lobbyTypeID, setLobbyTypeID] = useState(1);
    const [name, setName] = useState("");
  
    useEffect(() => {
        if(regName.test(name)) {
          setSubmitButton(false);
        }else {
          setSubmitButton(true);
        }
      }, [name]);

    const startGameButton = async () => {
        try {
            const response = await lobbyCreate(name, maxGames, lobbyTypeID);
            if (response.status === 200) {
                localStorage.setItem("lobbyID", response.data.id);
                //lobbyConfigSet(response.data.id, name, maxGames, 1); // , lobbyTypeID
                router.push("/game_arena");
            }
          }catch (e) {
            //console.log(e.message);
            setErrorMessage(e.response.data.detail[0].msg)
          }
    };

    const rootClass = [st.modal_create_game];
    if (visible) {
        rootClass.push(st.modal_create_game_vis);
    }
    
  return (
    <div className={rootClass.join(" ")} onClick={() => setVisible(false)}>
        <div className="modal_create_game_option" onClick={(e) => e.stopPropagation()}>
            <div className="create_game">
                <div className="">
                    <p className="modal_create_game_title_up">Название игры:</p>
                    <div className="">
                        <input type="text" className="create_game_name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div className="num_rounds_game">
                    <p className="modal_create_game_title">Количество раундов:</p>
                    <div className="round_choice">
                        <div className="round_choice_radio">
                            <input type="radio" name="round" value="1" id="round_1" checked={maxGames == '1' ? true : false} className="round_radio" onChange={(e) => setMaxGames(e.target.value)}/>
                            <label htmlFor="round_1">1</label>
                        </div>
                        <div className="round_choice_radio">
                            <input type="radio" name="round" value="3" id="round_3" checked={maxGames == '3' ? true : false} className="round_radio"  onChange={(e) => setMaxGames(e.target.value)}/>
                            <label htmlFor="round_3">3</label>
                        </div>
                        <div className="round_choice_radio">
                            <input type="radio" name="round" value="5" id="round_5" checked={maxGames == '5' ? true : false} className="round_radio"  onChange={(e) => setMaxGames(e.target.value)}/>
                            <label htmlFor="round_5">5</label>
                        </div>
                    </div>
                </div>
                <div className="game_mode_choice">
                    <p className="modal_create_game_title">Режим игры:</p>
                    <div className="game_mode_change">
                        <div className="usual_mode">
                            <input type="radio" name="mode" value={1} id="usual" checked={lobbyTypeID == '1' ? true : false} className="mode_radio" onChange={(e) => setLobbyTypeID(e.target.value)}/>
                            <span className="tooltip">
                                <label htmlFor="usual">Обычный</label>
                                <span className="tooltiptext">
                                    <span>
                                        Обычная версия игры в которой только три знака:<br />
                                        Камень, Ножницы, Бумага.<br />
                                        Победитель определяется по следующим правилам:<br />
                                        Бумага побеждает камень;<br />
                                        Камень побеждает ножницы;<br />
                                        Ножницы побеждают бумагу.
                                    </span>
                                </span>
                            </span>
                        </div>
                        <div className="advanced_mode">
                            <input type="radio" name="mode" value={2} id="advanced" checked={lobbyTypeID == '2' ? true : false} className="mode_radio" onChange={(e) => setLobbyTypeID(e.target.value)}/>
                            <span className="tooltip">
                                <label htmlFor="advanced">Расширенный</label>
                                <span className="tooltiptext">
                                    <span>
                                        Расширенная версия игры в которой пять знаков:<br />
                                        Камень, Ножницы, Бумага, Ящерица, Спок.<br />
                                        Победитель определяется по следующим правилам:<br />
                                        Ножницы режут бумагу. Бумага заворачивает камень.<br />
                                        Камень давит ящерицу, а ящерица травит Спока,<br />
                                        в то время как Спок ломает ножницы, которые,<br />
                                        в свою очередь, отрезают голову ящерице,<br />
                                        которая ест бумагу, на которой улики против Спока.<br />
                                        Спок испаряет камень, а камень,<br />
                                        разумеется, затупляет ножницы
                                    </span>
                                </span>
                            </span>
                        </div>
                    </div>
                    <ErrorMessage error={errorMessage}/>
                    <div className="div_b_create_game">
                        <button type="submit" name="button_create_game" className="button_create_game butt_game" disabled={submitButton} onClick={startGameButton}>Создать</button>
                        <button type="button" name="button_cancel_game" className="button_cancel_game butt_game" onClick={() => setVisible(false)}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
