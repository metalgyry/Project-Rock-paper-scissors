import ChangePassword from "../Pages/ChangePassword";
import ChangePasswordConfirm from "../Pages/ChangePasswordConfirm";
import Confirm from "../Pages/Confirm";
import GameArena from "../Pages/GameArena";
import Login from "../Pages/Login";
import Main from "../Pages/Main";
import NewPassword from "../Pages/NewPassword";
import Reg from "../Pages/Reg";


export const noAuthRouters = [
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/reg",
        Component: Reg
    },
    {
        path: "/confirm",
        Component: Confirm
    },
    {
        path: "/change_pass",
        Component: ChangePassword
    },
    {
        path: "/confirm_change",
        Component: ChangePasswordConfirm
    },
    {
        path: "/new_password",
        Component: NewPassword
    },
    {
        path: "/main",
        Component: Main
    },
];

export const authRouters = [
    {
        path: "/main",
        Component: Main
    },
    {
        path: "/game_arena",
        Component: GameArena
    },
    {
        path: "/login",
        Component: Login
    },
];