import * as React from "react";
import { Routes, Route } from "react-router-dom";
import AlertMsg from "../components/alertMsg/AlertMsg";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import CartPage from "../pages/CartPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderPage from "../pages/OrderPage";
import RegisterPage from "../pages/RegisterPage";
import SalesPage from "../pages/SalesPage";
import AuthRequire from "./AuthRequire";
//import useAuth from "../hooks/useAuth"

function Router() {
    //const { user } = useAuth();
    return (
        <Routes>
            <Route>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                </Route>
            </Route>

            <Route path="/" element={<AuthRequire> <MainLayout /> </AuthRequire>}>
                <Route index element={<HomePage />} />
                <Route path="products/:id" element={<DetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/account" element={<AccountPage />} />
            </Route>

            <Route>
                <Route path="/sales" element={<AuthRequire><AlertMsg /><SalesPage /></AuthRequire>} />

            </Route>


            <Route element={<BlankLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default Router;