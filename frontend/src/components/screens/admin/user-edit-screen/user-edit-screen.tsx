import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../../form-container/form-container";
import Loader from "../../../spinner/spinner";
import Message from "../../../message/message";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../../../slices/users-api-slice";
import "./user-edit-screen.css"


const UserEditScreen: React.FC = () => {
  const { id: userId } = useParams<{ id: string }>();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const dataSent = {
  userId,
  name,
  email,
  isAdmin,
};

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUser(dataSent).unwrap();
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error || "Error updating user");
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <Link to="/admin/userlist" className="">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error &&
              ("data" in error
                ? (error.data as { message?: string })?.message ||
                  "An error occurred"
                : "error" in error
                ? error.error
                : "An error occurred")}
          </Message>
        ) : (
          <form className="edit-form" onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <input
                id="isadmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label htmlFor="isadmin" className="checkbox-label">
                Is Admin
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
