import React, { FC, useState } from "react";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { getQuestionStatListService } from "@/services/stat";
import { STAT_PAGE_SIZE } from "@/constants";
import { useGetComponentInfo } from "@/hooks";
import { Pagination, Spin, Table, Typography } from "@arco-design/web-react";
import { render } from "react-dom";

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const PageStat: FC<PropsType> = props => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { id = "" } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, records = [] } = res;
        setTotal(total);
        setList(records);
      },
    },
  );
  const { componentList } = useGetComponentInfo();
  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));
  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c;

    const colTitle = props!.title || title;

    return {
      title: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}>
          <span style={{ color: fe_id === selectedComponentId ? "#1890ff" : "inherit" }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
      render: (col, record, index) => {
        return (Array.isArray(col) ? col.join("，") : col) ?? "--";
      },
    };
  });
  const TableElem = (
    <>
      <Table columns={columns} data={dataSource} pagination={false} placeholder="--"></Table>
      <div style={{ textAlign: "center", marginTop: "18px" }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onPageSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );
  return (
    <div>
      <h3>答卷数量: {!loading && total}</h3>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  );
};

export default PageStat;
