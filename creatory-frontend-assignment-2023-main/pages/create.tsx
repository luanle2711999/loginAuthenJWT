/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { InfoFormat } from "@/entity/InfoFormat";
import ModalAddMem from "@/model/ModalAddMem";
import { Button, Layout, Space, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

const endpoint = "http://localhost:8080";
export default function create() {
  const [dataSource, setDataSource] = useState();
  const modalRef = useRef(null);

  const openModal = useCallback((item?: InfoFormat) => {
    return (modalRef?.current as any).openModal(item);
  }, []);
  const columns: ColumnsType<InfoFormat> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <a>{record?.name}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => {
        return <span>{record?.email}</span>;
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (_, record) => {
        return <span>{record?.phone}</span>;
      },
    },
  ];
  const getDataMems = useCallback(async () => {
    const data = await axios.get(endpoint + "/student/getStudents", {
      data: { status: false },
    });
    setDataSource(data.data);
    console.log(data.data);
  }, []);

  useEffect(() => {
    getDataMems;
  }, [getDataMems]);
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Content>
          <Button
            title="Add a new member"
            onClick={() => {
              openModal();
            }}
          >
            Add student
          </Button>
          <Table dataSource={dataSource} columns={columns} />
          <ModalAddMem
            reloadList={() => {
              getDataMems();
            }}
            ref={modalRef}
          />
        </Content>
      </Layout>
    </Space>
  );
}
