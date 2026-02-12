import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-bold text-2xl">
        No Requests Found!
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-2 my-5">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, about, age, gender } =
            request.fromUserId;
          return (
            <div
              key={request._id}
              className="card w-96 bg-base-300 card-xs shadow-sm"
            >
              <figure>
                <img src={photoUrl} alt="photo" />
              </figure>
              <div className="card-body">
                <h1 className="text-xl">{firstName + " " + lastName}</h1>
                <p>{age + ", " + gender}</p>
                <p>{about}</p>
              </div>
              <div className="card-actions justify-around my-4">
                <button
                  className="btn btn-error"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
