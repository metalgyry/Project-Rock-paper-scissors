import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../Components/ErrorMessage';
import '../styles/all_style.css';
import { gameField, gameSendHand, lobbyChange } from '../http/userAPI';
import { creatorWinner } from '../Components/gameWinner';

export default function GameArena() {
  var oneCompleteSubmit = false;
  var firstLoadComponent = false;
  var oneStrGameStatus = false;
  var flagChangeScore = false;
  var objectID = 0;
  var statEnemyGameScore = 0;
  var statMyGameScore = 0;

  const [lobbyTypeID, setLobbyTypeID] = useState("");

  

  const [strMainButton, setStrMainButton] = useState("Выкинуть руку");
  //const [changeMainButtonState, setChangeMainButtonState] = useState(false);
  

  const [enemyNickname, setEnemyNickname] = useState("ПРОТИВНИК");

  //const [oneStrGameStatus, setOneStrGameStatus] = useState(false); //
  

  const [strGameStatus, setStrGameStatus] = useState("Поиск противника...");
  const [enemyGameScore, setEnemyGameScore] = useState(0);
  const [myGameScore, setMyGameScore] = useState(0);
  
 
  

  const lobbyID = localStorage.getItem("lobbyID");
  const myID = localStorage.getItem("userID");

  const [gameID, setGameID] = useState(0);
  ///const [arrayGames, setArrayGames] = useState([]);
  
  //const [objectID, setobjectID] = useState(0);
  

  const router = useHistory();
  const [hand, setHand] = useState(0);
  const [myHand, setMyHand] = useState("");
  const [enemyHand, setEnemyHand] = useState("");

  ///const [oneCompleteSubmit, setOneCompleteSubmit] = useState(false); ///
  

  const [completeSubmit, setcompleteSubmit] = useState(true);
  const [submitButton, setSubmitButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const exitGameButton = async () => {
    try {
        const responce = await lobbyChange(lobbyID, 2);
        if (responce.status === 200) {
            localStorage.removeItem("lobbyID");
            router.push("/main");
        }
    }catch (e) {
        alert(e.response.data.detail[0].msg);
    }
  };

  useEffect(() => {
    if (!completeSubmit) {
        if(hand) {
            setSubmitButton(false);
          }else {
            setSubmitButton(true);
          }
    }
  }, [hand]);

  const scoreWinner = (MyScore, EnemyScore, EnemyName) => {
    let result = "Ничья";
    if(MyScore > EnemyScore) {
        result = localStorage.getItem("myNickname");
    } else if(MyScore < EnemyScore) {
        result = EnemyName;
    }
    return result;
  }

  const strHand = (idHand) => {
    let result;
    if(idHand == 1){
        result = "Камень";
    }else if(idHand == 2){
        result = "Бумага";
    }else if(idHand == 3){
        result = "Ножницы";
    }else if(idHand == 4){
        result = "Ящерица";
    }else if(idHand == 5) {
        result = "Спок";
    }
    return result;
  }

  const changeEnemyName = (enemyName) => {
    if(enemyNickname === "ПРОТИВНИК") {
        setEnemyNickname((enemyNickname) => enemyNickname = enemyName);
    }
  }

  const gameInfo = async () => {
    setErrorMessage((errorMessage) => errorMessage = "");
    try {
        const response = await gameField();
            if(response.status === 200) {
                if(!lobbyTypeID) {
                    setLobbyTypeID((lobbyTypeID) => lobbyTypeID = response.data[objectID].game_type_id);
                }

                if(!firstLoadComponent) {
                    firstLoadComponent = true;
                    var gameStatus = response.data[objectID].game_status_id;
                    if((gameStatus != 1) && (gameStatus != 4) && (gameStatus != 2)) {
                        if(objectID != (response.data.length - 1)) {
                            do {
                                if(response.data[objectID].winner_id == myID) {
                                    setMyGameScore((myGameScore) => myGameScore + 1);
                                    statMyGameScore += 1;
                                }else {
                                    setEnemyGameScore((enemyGameScore) => enemyGameScore + 1);
                                    statEnemyGameScore += 1;
                                }
                                objectID += 1;
                            } while(((response.data.length - 1) > objectID) && (response.data[objectID].game_status_id == 3))
                        }
                    }
                }
                
                setGameID((gameID) => gameID = response.data[objectID].id);
                changeEnemyName(response.data[objectID].opponent_nickname);

                if((response.data[objectID].game_status_id == 3) && ((!response.data[objectID].creator_card_id) && (!response.data[objectID].player_card_id))) {
                    setcompleteSubmit(completeSubmit => completeSubmit = true);
                    setSubmitButton((submitButton) => submitButton = true);
                    setStrGameStatus((strGameStatus) => strGameStatus = "Победитель: " + scoreWinner(statMyGameScore, statEnemyGameScore, response.data[objectID].opponent_nickname) );

                }else {
                    if(response.data[objectID].game_status_id == 4) {
                        setSubmitButton((submitButton) => submitButton = true);
                        setStrGameStatus((strGameStatus) => strGameStatus = "Победитель: " + scoreWinner(statMyGameScore, statEnemyGameScore, response.data[objectID].opponent_nickname) );
                    }
                    if((response.data[objectID].game_status_id == 3) && ((response.data[objectID].creator_card_id) && (response.data[objectID].player_card_id))) {
                        let winner = "";
                        let result = "";
                        let resultMessage = "Выиграл эту игру: ";
                        

                        ///setOneCompleteSubmit(oneCompleteSubmit => oneCompleteSubmit = false);
                        oneCompleteSubmit = false;
                        //setOneStrGameStatus((oneStrGameStatus) => oneStrGameStatus = false);
                        oneStrGameStatus = false;
                        if(!flagChangeScore) { // if
                            flagChangeScore = true;
                            //setFlagChangeScore((flagChangeScore) => flagChangeScore = 1 );
                            if((response.data[objectID].creator_id == myID) && !(response.data[objectID].player_id == myID)) { // && (completeSubmit)
                                // Я создатель лобби
    
                                setMyHand((myHand) => myHand = strHand(response.data[objectID].creator_card_id));
                                setEnemyHand((enemyHand) => enemyHand = strHand(response.data[objectID].player_card_id));
    
                                result = creatorWinner(response.data[objectID].creator_card_id, response.data[objectID].player_card_id);
                                if(result == "win") {
                                    setMyGameScore((myGameScore) => myGameScore + 1);
                                    statMyGameScore += 1;
                                    winner = localStorage.getItem("myNickname");
                                }else if(result == "lose") {
                                    setEnemyGameScore((enemyGameScore) => enemyGameScore + 1);
                                    statEnemyGameScore += 1;
                                    winner = response.data[objectID].opponent_nickname;
                                }else if(result == "draw") {
                                    winner = "Ничья";
                                }
                            }else {
                                // Я НЕ создатель лобби
    
                                setMyHand((myHand) => myHand = strHand(response.data[objectID].player_card_id));
                                setEnemyHand((enemyHand) => enemyHand = strHand(response.data[objectID].creator_card_id));
                                
                                result = creatorWinner(response.data[objectID].creator_card_id, response.data[objectID].player_card_id);
                                if(result == "lose") {
                                    setMyGameScore((myGameScore) => myGameScore + 1);
                                    statMyGameScore += 1;
                                    winner = localStorage.getItem("myNickname");
                                }else if(result == "win") {
                                    setEnemyGameScore((enemyGameScore) => enemyGameScore + 1);
                                    statEnemyGameScore += 1;
                                    winner = response.data[objectID].opponent_nickname;
                                }else if(result == "draw") {
                                    winner = "Ничья";
                                }
                            }

                            //setChangeMainButtonState((changeMainButtonState) => changeMainButtonState = true);
                            //setStrMainButton((strMainButton) => strMainButton = "Следующая игра");
                            //setSubmitButton((submitButton) => submitButton = false);
                            //setcompleteSubmit(completeSubmit => completeSubmit = true);

                            if(objectID < (response.data.length - 1) ) {
                                //setobjectID((objectID) => objectID + 1);
                                objectID += 1;
                                resultMessage = resultMessage + winner;
                            }else {
                                setcompleteSubmit(completeSubmit => completeSubmit = true);
                                setSubmitButton((submitButton) => submitButton = true);
                                if((response.data.length - 1) != 0) {
                                    winner = scoreWinner(statMyGameScore, statEnemyGameScore, response.data[objectID].opponent_nickname);
                                }
                                resultMessage = "Победитель: " + winner;
                            }
                            setStrGameStatus((strGameStatus) => strGameStatus = resultMessage );
                        }
                        
                    }else {
                        if(response.data[objectID].game_status_id == 2) {
                                //setMyHand((myHand) => myHand = "");
                                //setEnemyHand((enemyHand) => enemyHand = "");
                                
                                if((response.data[objectID].creator_id == myID) && !(response.data[objectID].player_id == myID)) {
                                    if(response.data[objectID].creator_card_id){
                                        setcompleteSubmit(completeSubmit => completeSubmit = true);
                                        ///setOneCompleteSubmit(oneCompleteSubmit => oneCompleteSubmit = true);
                                        oneCompleteSubmit = true;
                                    }
                                } else {
                                    if(response.data[objectID].player_card_id){
                                        setcompleteSubmit(completeSubmit => completeSubmit = true);
                                        ///setOneCompleteSubmit(oneCompleteSubmit => oneCompleteSubmit = true);
                                        oneCompleteSubmit = true;
                                    }
                                }
                                if((!response.data[objectID].opponent_ready) && (!oneStrGameStatus)) {
                                    setStrGameStatus((strGameStatus) => strGameStatus = "" );
                                }
                                if(!oneCompleteSubmit) {
                                    flagChangeScore = false;
                                    setHand((hand) => hand = 0);
                                    setcompleteSubmit(completeSubmit => completeSubmit = false);
                                    ///setOneCompleteSubmit(oneCompleteSubmit => oneCompleteSubmit = true); // в другом месте изменить, в 3 состояние
                                    oneCompleteSubmit = true;
                                }
                                if(response.data[objectID].opponent_ready && (!oneStrGameStatus)) {
                                    setStrGameStatus("(Противник выбрал руку)");// (strGameStatus) => strGameStatus = "(Противник выбрал руку)"
                                    //setOneStrGameStatus((oneStrGameStatus) => oneStrGameStatus = true);  // в другом месте изменить, в 3 состояние
                                    oneStrGameStatus = true;
                                }

                        }
                    }
                }
            }
    }catch (e) {
        alert(e.response.data.detail[0].msg);
    }
  }

  useEffect( () => {
    gameInfo();
  }, []);
  
  useEffect(() => {
    const interval = setInterval( async () => {
        gameInfo();
    }, 2000);
    return () => clearInterval(interval);
}, []);

  const gameButton = async () => {
    try {
        setSubmitButton((submitButton) => submitButton = true);
        setcompleteSubmit(completeSubmit => completeSubmit = true);
        setHand(0);

        setErrorMessage("");
        const response = await gameSendHand(gameID, hand);
        if (response.status == 200) {
          
        }
    }catch (e) {
        alert(e.response.data.detail[0].msg)
    }
  }

 //style={{ opacity: (changeMainButtonState == true ) ? "0.6" : "1"}}
  return (
    <div>
        <div className="window_main">
            <div className="window_content_main">
                <div className="header_main">
                    <div className="header_main_inform gdiv_logout">
                        <button type="button" className="logout" onClick={exitGameButton}>Выход из игры</button>
                    </div>
                    <div className="list_lobby_header gdiv_name_enemy">
                        {enemyNickname}
                    </div>
                </div>
                <div className="game_zone">
                    <div className="game_arena">
                        <div className="hand_game">
                            <div className="hand">
                                {enemyHand}
                            </div>
                        </div>
                        <div className="game_info">
                            {strGameStatus}
                            <br/>
                            {enemyGameScore}:{myGameScore}
                        </div>
                        <div className="hand_game">
                            <div className="hand">
                                {myHand}
                            </div>
                        </div>
                    </div>
                    <div className="my_hand">
                        <div className="butt_choice_hand">
                            <button type="button" className="butt_ready_hand" disabled={submitButton} onClick={gameButton}>{strMainButton}</button>
                        </div>
                        <div className="hand_change">
                            <div className="hand_item" disabled={submitButton}>
                                <input id="radio-1" type="radio" name="hand" value={1} checked={hand == 1 ? true : false} onChange={(e) => setHand(e.target.value)}/>
                                <label htmlFor="radio-1">Камень</label>
                            </div>
                            <div className="hand_item">
                                <input id="radio-2" type="radio" name="hand" value={2} checked={hand == 2 ? true : false} onChange={(e) => setHand(e.target.value)}/>
                                <label htmlFor="radio-2">Бумага</label>
                            </div>
                            <div className="hand_item">
                                <input id="radio-3" type="radio" name="hand" value={3} checked={hand == 3 ? true : false} onChange={(e) => setHand(e.target.value)}/>
                                <label htmlFor="radio-3">Ножницы</label>
                            </div>
                            <div className="hand_item"  style={{ display: (lobbyTypeID == 2)  ? "block" : "none" }}>
                                <input id="radio-4" type="radio" name="hand" value={4} checked={hand == 4 ? true : false} onChange={(e) => setHand(e.target.value)}/>
                                <label htmlFor="radio-4">Ящерица</label>
                            </div>
                            <div className="hand_item"  style={{ display: (lobbyTypeID == 2)  ? "block" : "none" }}>
                                <input id="radio-5" type="radio" name="hand" value={5} checked={hand == 5 ? true : false} onChange={(e) => setHand(e.target.value)}/>
                                <label htmlFor="radio-5">Спок</label>
                            </div>
                        </div>
                        <div className="my_nickname">
                            {!errorMessage ? localStorage.getItem("myNickname") : <ErrorMessage error={errorMessage}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}