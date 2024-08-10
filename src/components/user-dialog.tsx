import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { DialogShape, userShape } from "../interfaces";
import { getUsers } from "../helper";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const UserDialog: React.FC<DialogShape> = ({ visibility, onRequestClose }) => {
  const [users, setUsers] = useState([]);
  const [downloadingUsers, setDownloadingUsers] = useState(false);
  const [searchText, setSearchText] = useState("");

  let filteredUsers = [];

  const onAppear = async () => {
    try {
      setDownloadingUsers(true);
      const response = await getUsers();
      setUsers(response?.data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDownloadingUsers(false);
    }
  };

  const onSearchTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // const filteredItems = users.filter((item: userShape) => {
  //   console.log("this log appear in every component render");
  //   item.email.toLowerCase().includes(searchText.toLowerCase());
  // });

  const filteredItems = useMemo(() => {
    console.log(
      "this log only appear when users array or search text value changes"
    );
    return users.filter((item: userShape) => {
      return item.email.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [searchText, users]);

  useEffect(() => {
    onAppear();
  }, []);

  return (
    <div>
      <Modal
        isOpen={visibility}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='primary-input-container'>
          <input
            type='text'
            className='primary-input'
            onChange={onSearchTextChanged}
            placeholder='Searching method is using useMemo callback'
          ></input>
        </div>
        <h2>email and password can use for login</h2>
        {downloadingUsers ? (
          "Loading"
        ) : (
          <ol>
            {filteredItems.map((i: userShape) => (
              <li key={i.id}>{`${i.email} / ${i.password}`}</li>
            ))}
          </ol>
        )}
      </Modal>
    </div>
  );
};

export default UserDialog;
