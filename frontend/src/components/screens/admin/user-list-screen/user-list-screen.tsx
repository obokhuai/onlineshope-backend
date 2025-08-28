import React from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
// import Message from '../../components/Message';
// import Loader from '../../components/Loader';
// import {
//   useDeleteUserMutation,
//   useGetUsersQuery,
// } from '../../slices/usersApiSlice';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Message from "../../../message/message";
import Loader from "../../../spinner/spinner";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../../slices/users-api-slice";
import "./user-list-screen.css"

const UserListScreen: React.FC = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery(1);

  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted")
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || err.error || "Error deleting user");
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader/>}
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
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`} className="email-link">
                    {user.email}
                  </a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {!user.isAdmin && (
                    <>
                      <Link
                        to={`/admin/user/${user._id}/edit`}
                        className="btn btn-light btn-sm"
                        style={{ marginRight: 10 }}
                        aria-label={`Edit user ${user.name}`}
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="btn btn-danger btn-sm"
                        aria-label={`Delete user ${user.name}`}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserListScreen;
