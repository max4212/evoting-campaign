import { useEffect } from "react";
import { useState } from "react";
import React, { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

export default function UserView() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {id,userName,userPW,email,userType}=location.state.user;
  const [readOnly, setReadOnly] = useState(true);

  const dataChangeHandler = (event) => {
    if (event.target.id === "backBtn") {
      navigate("/users");
    } else if (event.target.id === "modifyBtn") {
      navigate("/modifyOwn", {
        state: {
          id,
          userName,
          userPW,
          email,
          userType,
    		  usagePurpose: "modify",
        },
      });
    }
  };

  return (
    <div className="p-1 my-1">
          <div className="flex align-middle justify-end gap-x-1">
              <button
                  className="btn btn-info"
                  id="modifyBtn"
                  onClick={dataChangeHandler}
              >
                  Modify
              </button>
              <button
                  className="btn btn-danger"
                  id="backBtn"
                  onClick={dataChangeHandler}
              >
                  Back
              </button>
          </div>
          <div class="card mt-2">
              <div class="card-header">User Details</div>
              <div class="card-body">
                  <div class="mb-3">
                      <label for="userName" class="form-label">
                          User Name
                      </label>
                      <input
                          type="text"
                          class="form-control"
                          id="userName"
                          placeholder="User Name"
                          readOnly={readOnly}
                          value={userName} />
                  </div>
                  <div class="mb-3">
                      <label for="userPW" class="form-label">
                          Password
                      </label>
                      <input
                          type="text"
                          class="form-control"
                          id="userPW"
                          placeholder="Password"
                          readOnly={readOnly}
                          value={userPW} />
                  </div>
                  <div class="mb-3">
                      <label for="email" class="form-label">
                          E-Mail Address
                      </label>
                      <input
                          type="text"
                          class="form-control"
                          id="email"
                          placeholder="E-Mail Address"
                          readOnly={readOnly}
                          value={email} />
                  </div>
              </div>
              {/* <div class="card-footer text-muted">
                2 days ago
            </div> */}
          </div>
      </div>
  );
}
