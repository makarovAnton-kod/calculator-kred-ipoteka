import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/usersActions";

function Header() {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    return (
        <div className="bg-success text-white p-4">
            <div className="container text-center">
                <Link className="text-white text-decoration-none" to="/">
                    <h1>Кредит +</h1>
                </Link>
                <hr className="bg-white" />
                {user && user.role === 'admin' && (
                    <Link className="text-white text-decoration-none" to="/admin">
                        Админ панель
                    </Link>
                )}
                {user ? (
                    <button
                        className="btn btn-danger mt-2"
                        onClick={() => dispatch(logoutUser())}>
                        Выйти
                    </button>
                ) : (
                    <div className="mt-2">
                        <Link className="text-white text-decoration-none me-3" to="/login">Войти</Link>
                        <Link className="text-white text-decoration-none" to="/register">Зарегистрироваться</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
