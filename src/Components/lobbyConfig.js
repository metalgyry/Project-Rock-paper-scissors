// В userType храниться информация о том, кем является зашедщий в лобби: 1 - создатель; 2 - вошедший игрок

// по итогу не использую т.к. только lobbyID использую, остальные поля нет
export function lobbyConfigSet(lobbyID, name, maxGames, userType) {
    localStorage.setItem("lobbyID", lobbyID);
    localStorage.setItem("name", name); // пока не используется вывожу только имя противника, но не название игры
    localStorage.setItem("maxGames", maxGames); // тоже не используется, так как теперь есть инфа о результате игры
    localStorage.setItem("userType", userType); // тоже не использую так как по итогу нужно высчитывать в самом лобби т.к.
                                                //  если перезаход то этой инфы может и не быть
};

export function lobbyConfigDel() {
    localStorage.removeItem("lobbyID");
    localStorage.removeItem("name");
    localStorage.removeItem("maxGames");
    localStorage.removeItem("userType");
};