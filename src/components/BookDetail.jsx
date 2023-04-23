import React, { useState } from "react";
import {
  EditOutlined,
  MailOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
// import axios from "axios";
import { Modal, Form, Input, Card, Col } from "antd";
import "../styles/Card.scss";
// import { server } from "../index";

export const Cards = ({
  id,
  title,
  author,
  setUpdate
}) => {
  const [Title, setTitle] = useState(title);
  const [Author, setAuthor] = useState(author);
  // const [Phone, setPhone] = useState(phone);
  // const [Website, setWebsite] = useState(website);
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
    // handleDeleteExchange(id);
  };


  //function for cancel icon in the form model
  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };


  //function for ok button in the form model
  // const handleEditModalOk = async (id) => {
  //   try {
  //     await axios.put(
  //       `{${server}/showAll}`,
  //       {
  //         title: title,
  //         author: author,
         
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setIsEditModalVisible(false);
  //     setUpdate((update) => !update);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Card
      style={{ width: "100%", height: "100%" }}
      cover={
        <img
          className="card-avatar"
          alt="example"
          src={`https://avatars.dicebear.com/v2/avataaars/${id}.svg?options[mood][]=happy`}
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

{/* <Modal
        visible={isEditModalVisible}
        title="Edit Item"
        onCancel={handleEditModalCancel}
        // onOk={() => handleEditModalOk(id)}
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
            label="Title"
            name="Title"
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
            label="Author"
            name="Author"
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
      </Modal> */}

      <h3 style={{ marginTop: "2px" }}>{title}</h3>
      <Col justify="space-between" display="flex" gap="2rem" flexWrap="wrap">
        <Col>
          <MailOutlined style={{ paddingRight: "5px" }} />
          <span style={{ marginLeft: "1px" }}>{author}</span>
        </Col>
      
      </Col>
    </Card>
  );
};
