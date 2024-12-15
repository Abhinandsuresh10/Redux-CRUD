  import { toast } from "react-toastify";
  import { useGetUsersQuery, useDeleteUserMutation } from "../slices/adminApiSlice";
  import { useNavigate } from "react-router-dom";
  import { useState } from "react";



  const AdminHero = () => {

    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [searchQuery, setSearchQuery] = useState('')

    if (isLoading) {
      return <p className="font-semibold"><i>Loading user data...</i></p>;
    }

    if (isError) {
      return <p className="text-red-500">Error: {error?.data?.message || 'Failed to load users.'}</p>;
    }

    const handleDelete = async(userId) => {
      window.confirm('are you sure you want to delete this user ?')
    try {
      await deleteUser(userId).unwrap();
      toast.success('user has been deleted')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
    }

    const handleEditUser = (userId) => {
      navigate(`/edit-user/${userId}`)
    }
    
    const users = data?.users || [];
  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
    
      return (
        <div className="p-6">
       <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-2 border rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg focus:shadow-outline focus:ring focus:ring-offset-blue-950 focus:outline-none"
          />
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-gray-300 p-4 rounded-lg shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={`http://localhost:5000${user.image}`}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
    
                  <div className="flex space-x-4 mt-4 w-full justify-center">
                    <button 
                      type="submit" 
                      className="bg-yellow-600 text-white p-2 rounded-lg w-24 hover:shadow-xl"
                      onClick={() => handleEditUser(user._id)}
                    >
                      Edit
                    </button>
                    <button 
                      type="submit" 
                      className="bg-red-600 text-white p-2 rounded-lg w-24 hover:shadow-xl"
                      onClick={()=> handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default AdminHero;

    
    
