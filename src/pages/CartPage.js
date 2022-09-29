
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getShoppingCart } from "../features/cart/cartSlice";
import CartsList from "../features/cart/CartsList";
import useAuth from "../hooks/useAuth";



function CartPage() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    let { carts, page } = useSelector((state) => state.cart)

    useEffect(() => {
        if (user) dispatch(getShoppingCart(page))
    }, [dispatch, page, user])
    return (
        <>
            {
                (carts.length !== 0 && carts.totalItem !== 0)
                    ? (<CartsList carts={carts} />)
                    : (navigate("/"))

            }

        </>
    )
}

export default CartPage;