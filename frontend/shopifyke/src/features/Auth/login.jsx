import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchUserData } from "../authslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (auth._id) {
            navigate("/cart");
        }
    }, [auth._id, navigate]);

    const { loginStatus, loginError } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(FetchUserData(user));
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />

                <button type="submit">
                    {loginStatus === "pending" ? "Logging in..." : "Login"}
                </button>
                {loginStatus === "rejected" ? <p>{loginError}</p> : null}
            </form>
        </div>
    );
};

export default Login;
