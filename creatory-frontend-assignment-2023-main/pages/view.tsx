"use client";
import { InfoFormat } from "@/entity/InfoFormat";
import { Layout, Space, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ColumnsType } from "antd/lib/table";
import React, { useCallback } from "react";
import dataSource from "../data/data.json";

export default function view() {
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

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Content title="This is a list of members">
            <Table dataSource={dataSource} columns={columns} />
          </Content>
        </Layout>
      </Space>
    </>
  );
}
