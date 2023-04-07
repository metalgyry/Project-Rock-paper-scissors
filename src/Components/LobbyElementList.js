import React from 'react'
import { useHistory } from 'react-router-dom';
import { lobbyChange } from '../http/userAPI';

export default function LobbyElementList( {idElement ,name, num_rounds, game_mode} ) {
    const router = useHistory();
    //const id = idElement;

    //const mode = "Режим: " + game_mode;
    //const num = "Раундов: " + num_rounds;

    const join = async () => {
        try {
            const responce = await lobbyChange(idElement, 1);
            if (responce.status === 200) {
                localStorage.setItem("lobbyID", idElement);
                //lobbyConfigSet(idElement, name, num_rounds, 2); // , game_mode
                router.push("/game_arena");
            }
        }catch (e) {
            alert(e.response.data.detail[0].msg);
        }
    }
//<div className="nickname_enemy">Creator: {nickname}</div> in usuall div
  return (
    <div>
        <div className="lobby_game">
            <div>
                <div className="name_enemy">{name}</div>
            </div>
                    <div className="lobby_game_stat">
                        <p className="num_rounds">
                            Раундов: {num_rounds}
                        </p>
                        <p className="game_mode">
                            Режим: {(game_mode == 1) ? "Обычная" : "Расширенная" }
                        </p>
                    </div>
                    <div className="join_div">
                        <button type="button" className="join_button" onClick={join}>Присоединиться</button>
                    </div>
        </div>
    </div>
  )
}
