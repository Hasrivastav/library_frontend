import React, { useContext, useState } from "react";
import {
  EditOutlined,
  MailOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import axios from "axios";
import { Modal, Form, Input, Card, Col, Avatar } from "antd";
import "../styles/Card.scss";
import Meta from "antd/es/card/Meta";
import { Context, server } from "../index";

export const Cards = ({
  id,
  title,
  author,

  deleteHandler
}) => {

  const {isAuthenticated,update,setUpdate} = useContext(Context)
  const [Title, setTitle] = useState(title);
  const [Author, setAuthor] = useState(author);
  const [liked, setLiked] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);   // to display and hide form model

  // function called when clicked on edit icon
  const handleEditClick = () => {
    setIsEditModalVisible(true);
  };


  // function called when clicked on heart icon
  const handleLikeClick = () => {
    setLiked(!liked);
  };

  // function called when clicked on bin icon
  const handleDeleteClick = (id) => {
    deleteHandler(id);
  };


  //function for cancel icon in the form model
  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };


  // function for ok button in the form model
  const handleEditModalOk = async(id) => {
    try {
      await axios.put(
        `${server}/task/${id}`,
        {
          title: Title,
          author: Author,
         
        },
        {
          withCredentials: true,
        }
      );
      console.log(title);
      setIsEditModalVisible(false);
      setUpdate((update) => !update);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
    style={{ width: "100%", height: "100%" }}
    cover={
      <img
        className="card-avatar"
        alt="example"
        src={`https://api.dicebear.com/6.x/shapes/svg?seed=${id}`}
        
      />
    }
    actions={[
      liked ? (
        <HeartFilled color="danger" onClick={handleLikeClick} />
      ) : (
        <HeartOutlined onClick={handleLikeClick} />
      ),
      <EditOutlined key="edit" onClick={handleEditClick} />,
      <DeleteOutlined onClick={() => handleDeleteClick(id)} />,
    ]}
  >
    <Modal
      visible={isEditModalVisible}
      title="Edit Item"
      onCancel={handleEditModalCancel}
      onOk={() => handleEditModalOk(id)}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Name"
          name="Name"
          initialValue={title}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
        <Input value={Title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="Email"
          initialValue={author}
          rules={[
            {
              required: true,
              message: "Please input your emaail!",
            },
          ]}
        >
        <Input value={Author} onChange={(e) => setAuthor(e.target.value)} />
        </Form.Item>
</Form>
    </Modal>

    <Meta
      avatar={<Avatar src={`https://avatars.dicebear.com/v2/avataaars/${id}.svg?options[mood][]=happy`}/>}
      title={title}
      description={author}
    />
  </Card>
  );
};



