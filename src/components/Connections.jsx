import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-bold text-2xl">
        No Connections Found!
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-2">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, about, age, gender } =
            connection;
          return (
            <div className="justify-evenly my-4" key={connection._id}>
              <div className="card w-96 bg-base-300 card-xs shadow-sm">
                <figure>
                  <img src={photoUrl} alt="photo" />
                </figure>
                <div className="card-body">
                  <h1 className="text-xl">{firstName + " " + lastName}</h1>
                  <p>{age + ", " + gender}</p>
                  <p>{about}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
