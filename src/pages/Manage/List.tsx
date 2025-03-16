import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ListSearch, QuestionCard } from "@/components";
import { useRequest, useTitle } from "ahooks";
import { createQuestionService, getQuestionListService } from "@/services/question";
import { LIST_PAGE_SIZE } from "@/constants";
import { Link, Message, Pagination, Spin } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";

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
  const nav = useNavigate();
  const { loading: createLoading, run: handleCreateQuestion } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`);
      Message.success("创建成功");
    },
  });

  const { run, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        ...params,
        isStar,
        isDeleted: false,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { records: list = [], total = 0 } = result;
        setList(list); // 累计
        setTotal(total);
      },
    },
  );

  useEffect(() => {
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
          {list.length > 0 ? (
            list.map((q: any) => {
              const { id } = q;
              return <QuestionCard key={id} {...q} />;
            })
          ) : (
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              暂无数据,{" "}
              <Link disabled={createLoading} onClick={handleCreateQuestion}>
                去创建
              </Link>
            </div>
          )}
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
