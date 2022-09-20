import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../features/order/orderSlice";
import OrderList from "../features/order/OrderList";
import useAuth from "../hooks/useAuth";


function OrderPage() {
    const { user } = useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate()

    let { orders, page } = useSelector((state) => state.order)

    useEffect(() => {
        if (user)
            dispatch(getOrders(page))
    }, [dispatch, page, user])


    return (
        <>
            {
                orders.length
                    ? (<OrderList orders={orders} />)
                    : (navigate("/"))

            }
        </>
    )
}

export default OrderPage;