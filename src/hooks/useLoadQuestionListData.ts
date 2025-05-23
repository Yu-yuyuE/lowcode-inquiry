import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionListService } from "@/services/question";
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from "@/constants";

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

export function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) ?? undefined;
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") || LIST_PAGE_SIZE;

      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize,
      });
      return data;
    },
    {
      refreshDeps: [searchParams], // 刷新的依赖项
    },
  );

  return { data, loading, error, refresh };
}
