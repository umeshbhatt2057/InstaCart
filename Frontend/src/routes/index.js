import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Payment from '../pages/Payment'; // Import Payment page
import OrderSuccess from '../pages/OrderSuccess';
import VerifyEmail from '../pages/VerifyEmail';
import OrderPage from '../pages/OrderPage';
import Faq from '../pages/FAQ';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "reset-password/:token", // Route for ResetPassword with token parameter
                element: <ResetPassword />
            },
            {
                path: "product-category",
                element: <CategoryProduct />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "payment",
                element: <Payment /> // Correctly use the Payment component
            },
            {
                path: "order-success",
                element: <OrderSuccess/>
            },
            {
                path : "verify-email/:token",
                element : <VerifyEmail/>

            },
            
            {
                path: "faq",
                element: <Faq/>

            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    }
                ]
            }
        ]
    }
]);

export default router;
