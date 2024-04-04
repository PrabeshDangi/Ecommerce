import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  //   useEffect(() => {
  //     const authCheck = async () => {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_API}/user/dashboard`,
  //         {
  //           headers: {
  //             Authorization: auth?.token,
  //           },
  //         }
  //       );

  //       //If context api use garera global header available garako chha vane :
  //       // const res = await axios.get(
  //       //   `${process.env.REACT_APP_API}/user/dashboard`
  //       // );
  //       console.log(res.data);
  //       if (res.data.ok) {
  //         setOk(true);
  //       } else {
  //         setOk(false);
  //       }
  //     };
  //     if (auth?.token) authCheck();
  //   }, [auth?.token]);
  //   return ok ? <Outlet /> : <Spinner />;
  // };
  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/user/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, // Attach token to Authorization header
            },
          }
        );

        //If context api use garera global header available garako chha vane :
        //   const res = await axios.get(
        //     `${process.env.REACT_APP_API}/user/dashboard`
        //   );
        console.log(response.data);
        if (response.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
