import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/usersActions";
import './../styles/Header.css'; // Импортируем CSS для пользовательских стилей

function Header() {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    return (
        <Navbar className="custom-navbar" expand="lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <h1 className="brand-title">Кредит +</h1>
                </Link>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-auto">
                        {user && user.role === 'admin' && (
                            <Link className="nav-link" to="/admin">Админ панель</Link>
                        )}
                    </Nav>
                    <div className="d-flex">
                        {user ? (
                            <Button variant="outline-danger" onClick={() => dispatch(logoutUser())}>
                                Выйти
                            </Button>
                        ) : (
                            <>
                                <Link className="btn btn-outline-success me-2" to="/login">Войти</Link>
                                <Link className="btn btn-outline-warning" to="/register">Зарегистрироваться</Link>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default Header;
