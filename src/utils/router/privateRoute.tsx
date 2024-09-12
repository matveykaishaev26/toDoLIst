import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const PrivateRoute = () => {
  const { token } = useSelector((state: RootState) => state.user);

  return token ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
