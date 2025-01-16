import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ListSearch, QuestionCard } from "@/components";
import { useRequest, useTitle } from "ahooks";
import { getQuestionListService } from "@/services/question";
import { LIST_PAGE_SIZE } from "@/constants";
import { Pagination, Spin } from "@arco-design/web-react";

interface ListProps {
  isStar?: boolean;
}

const List: FunctionComponent<ListProps> = ({ isStar }) => {
  useTitle("低代码问卷 - 我的问卷");
  // const [started, setStarted] = useState(false); // 是否已经开始加载（防抖，有延迟时间）
  const [page, setPage] = useState(1); // List 内部的数据，不在 url 参数中体现
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE); // List 内部的数据，不在 url 参数中体现
  const [list, setList] = useState([]); // 全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState({});

  const { run, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        ...params,
        isStar,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list = [], total = 0 } = result;
        setList(list); // 累计
        setTotal(total);
      },
    },
  );

  useEffect(() => {
    console.log(page, pageSize, params);
    run();
  }, [page]);

  return (
    <>
      <div className={styles.left}>
        <h3>{isStar ? "星标问卷" : "我的问卷"}</h3>
      </div>
      <div className={styles.right}>
        <ListSearch
          searchOptions={[
            {
              value: "name",
              label: "名称",
              type: "text",
            },
            {
              value: "createTime",
              label: "创建时间",
              type: "date",
            },
          ]}
          onSearch={params => {
            setPage(1);
            setParams(params);
          }}
        />
      </div>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Spin />
        </div>
      ) : (
        <div className={styles.content}>
          {/* 问卷列表 */}
          {list.length > 0 &&
            list.map((q: any) => {
              const { _id } = q;
              return <QuestionCard key={_id} {...q} />;
            })}
        </div>
      )}
      <Pagination
        total={total}
        current={page}
        pageSize={pageSize}
        onChange={page => setPage(page)}
        onPageSizeChange={size => {
          setPage(1);
          setPageSize(size);
        }}
        sizeCanChange
        showTotal
        hideOnSinglePage
      />
    </>
  );
};

export default List;
