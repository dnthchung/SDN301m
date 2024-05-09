import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Card/NoteCard";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    // Set the app element for react-modal
    Modal.setAppElement("#root"); // Assuming your root element has an id of 'root'
  }, []);

  //for api backend
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  //get user in4
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto">
        <div className=" grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting someone on 7th"
            date="3rd July 2021"
            content="gặp ai ó vào thứ 7 tuần tới gặp ai ó vào thứ 7 tuần tới gặp ai ó vào thứ 7 tuần tới"
            tags="#work"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenAddEditModal({ isShow: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShow: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
