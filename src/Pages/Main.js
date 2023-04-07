import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import LobbyElementList from '../Components/LobbyElementList';
import ModalCreateGame from '../Components/ModalCreateGame';
import { listLobby, userInfo } from '../http/userAPI';
import '../styles/all_style.css';

export default function Main() {
    const router = useHistory();
    if( !(localStorage.getItem("token")) ) {
        router.push("/login");
    }
    const [modal, setModal] = React.useState(false);
    
    const [lobbyListElements, setLobbyListElements] = useState([]);
    /*
    [
        {id: 1, nickname: "chel", num_rounds: "5", game_mode: "Расширенный"},
        {id: 2, nickname: "xdd", num_rounds: "3", game_mode: "Обычный"},
    ]
    */
    
    const listLobbyInfo = async () => {
        try {
            const response = await listLobby();
            if(response.status === 200) {
                setLobbyListElements(lobbyListElements => lobbyListElements = response.data) //
            } else if (response.status === 401) {
                localStorage.clear();
                router.push("/login");
                //console.log("401 error it's working in TRY!");
            }
        }catch (e) {
            alert(e.response.data.detail[0].msg);
        }
        
    };
    const getUserInfo = async () => {
        try {
            const response = await userInfo();
            if(response.status === 200 ) {
                if(response.data.current_lobby_id) {
                    localStorage.setItem("lobbyID", response.data.current_lobby_id);
                    router.push("/game_arena");
                }
            }
        }catch (e) {
            alert(e.response.data.detail[0].msg);
        }
    }
    
    useEffect( () => {
        listLobbyInfo();
        getUserInfo();
    }, []);
    
    useEffect(() => {
        const interval = setInterval( async () => {
            listLobbyInfo();
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    function setModalWindow(){
        setModal(true);
    };
    
    function logoutButton(){
        localStorage.clear();
        router.push("/login");
    };

    return (
    <div>
        <ModalCreateGame visible={modal} setVisible={setModal}/>
    <div className="window_main">
        <div className="window_content_main">
            <div className="header_main">
                <div className="header_main_inform">
                    <span className="nickname_profile">{localStorage.getItem("myNickname")}</span>
                    <button type="button" className="logout" onClick={logoutButton}>Выход</button>
                </div>
                <div className="list_lobby_header">
                    Список лобби
                </div>
            </div>
            <div className="list_lobby">
                {lobbyListElements.map((lobbyListElements) => 
                    <LobbyElementList key={lobbyListElements.id} idElement={lobbyListElements.id} name={lobbyListElements.name}
                    num_rounds={lobbyListElements.max_games} game_mode={lobbyListElements.lobby_type_id} />
                    //nickname={lobbyListElements.nickname} 
                )}
            </div>
            
            <div className="button_create_lobby">
                <button type="button" className="create_lobby" onClick={setModalWindow}>Создать лобби</button>
            </div>
        </div>
    </div>
    </div>
  )
}
