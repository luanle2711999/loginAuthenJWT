/* eslint-disable react/display-name */
import { Button, Form, Input, message, Modal, Spin } from "antd";
import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { InfoFormat } from "@/entity/InfoFormat";

const endpoint = "http://localhost:8080";

interface AddStudentProps {
  reloadList: () => void;
}
const ModalAddMem = React.forwardRef((props: AddStudentProps, ref) => {
  const [form] = Form.useForm();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<InfoFormat>();
  const [spining, setSpining] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      openModal: (item?: InfoFormat) => openModal(item),
      closeModal: () => closeModal(),
    };
  });

  const closeModal = useCallback(() => {
    form.resetFields();
    console.log(currentItem);
    setCurrentItem(undefined);
    setIsOpenModal(false);
  }, [currentItem, form]);

  const save = useCallback(async () => {
    const formValues = form.getFieldsValue();
    let result;
    setSpining(true);
    await axios.post(endpoint + "/api/register", formValues);
    setSpining(false);
    message.success("Thêm mới thành công");
    closeModal();
    if (props.reloadList) props.reloadList();
  }, [closeModal, form, props]);
  const openModal = useCallback(
    (item?: InfoFormat) => {
      setIsOpenModal(true);
      if (item) {
        form.setFieldsValue(item);
        setCurrentItem(item);
        console.log(currentItem);
      }
    },
    [currentItem, form]
  );

  return (
    <Spin spinning={spining} delay={1000}>
      <Modal
        open={isOpenModal}
        onCancel={closeModal}
        title="Add a new member"
        style={{ marginBottom: "20px" }}
        onOk={() => save()}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={() => {}}
          onFinishFailed={() => {}}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="username"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
});
export default ModalAddMem;
