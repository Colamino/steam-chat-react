import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import { InviteIcon } from "../assets/InviteIcon";

const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ user, setselectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelected = () => {
    if (selected) {
      setselectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setselectedUsers((prevUsers) => [...prevUsers, user.id]);
    }
    setSelected((prevSelected) => !prevSelected);
  };
  return (
    <div className="user-item__wrapper" onClick={handleSelected}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>
      {selected ? (
        <InviteIcon setSelected={setSelected} />
      ) : (
        <div className="user-item__invite-empty" />
      )}
    </div>
  );
};

function UserList({ setselectedUsers }) {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const res = await client.queryUsers(
          //return all id but ownself
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (res.users.length) {
          setUsers(res.users);
        } else {
          setListEmpty(true);
        }
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error loading, please refresh and try again.
        </div>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No users found.</div>
      </ListContainer>
    );
  }
  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading users...</div>
      ) : (
        users?.map((user, i) => (
          <UserItem
            index={i}
            key={user.id}
            user={user}
            setselectedUsers={setselectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
}

export default UserList;
