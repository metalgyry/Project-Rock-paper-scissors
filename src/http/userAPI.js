import { $host, $authHost } from "./index.js";

export const login = async (form) => { //username, password
    const response = await $host.post("signin/", form , { headers: { 'Content-Type': 'multipart/form-data'} });// { username: username, password: password } // , { headers: { 'Content-Type': 'multipart/form-data'} }
    return response;
};

export const registration = async (phone, password, nickname) => {
    const response = await $host.post("signup/", {phone: phone, password: password, nickname: nickname });
    return response;
};

export const confirm = async (username, code) => {
    const response = await $host.post("confirm/", { username: username, code: code });
    return response;
};

export const request = async (username) => {
    const response = await $host.post("reset-password/request/", { username: username });
    return response;
};

export const certify = async (username, code) => {
    const response = await $host.post("reset-password/certify/", { username: username, code: code });
    return response;
};

export const newPassword = async (certificate, new_password) => {
    const response = await $host.post("reset-password/new/", { certificate: certificate, new_password: new_password });
    return response;
};

export const listLobby = async () => {
    const response = await $authHost.get("lobby/");
    return response;
};

export const userInfo = async () => {
    const response = await $authHost.get("user/");
    return response;
};

export const lobbyCreate = async (name, max_games, lobby_type_id) => {
    const response = await $authHost.post("lobby/", { name: name, max_games: max_games, lobby_type_id: lobby_type_id });
    return response;
};

export const lobbyChange = async (id, lobby_action_id) => {
    const response = await $authHost.patch("lobby/", { id: id, lobby_action_id: lobby_action_id });
    return response;
};

export const gameField = async () => {
    const response = await $authHost.get("game/");
    return response;
};

export const gameSendHand = async (id ,card_id) => {
    const response = await $authHost.patch('game/',{ id: id, card_id: card_id },
    { headers: {'Access-Control-Allow-Origin' : "http://localhost:3000/", 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'}});
    return response;
};