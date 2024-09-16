import { Table as AntdTable } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { CommonComponentProps } from "../../interface";

const MOCK = [
  { name: "A", sex: "Male", birthday: new Date("1994-07-07").getTime() },
  { name: "B", sex: "Male", birthday: new Date("1995-06-06").getTime() },
  { name: "C", sex: "Female", birthday: new Date("1996-08-08").getTime() },
];
const Table = ({ url, children }: CommonComponentProps) => {
  const [data, setData] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (url) {
      setLoading(true);
      // const { data } = await axios.get(url);
      setData(MOCK);

      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      console.log("itme", item.props);

      if (item?.props?.type === "date") {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
          render: (value: any) =>
            value ? dayjs(value).format("YYYY-MM-DD") : null,
        };
      } else {
        return {
          title: item.props?.title,
          dataIndex: item.props?.dataIndex,
        };
      }
    });
  }, [children]);

  return (
    <AntdTable
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="id"
      loading={loading}
    />
  );
};

export default Table;
