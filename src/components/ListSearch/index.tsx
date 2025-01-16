import { LIST_SEARCH_PARAM_KEY } from "@/constants";
import { DatePicker, Input, Select } from "@arco-design/web-react";
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { setValue } from "../../../node_modules/reselect/src/autotrackMemoize/autotracking";

interface ListSearchProps {
  onSearch?: (value: any) => void;
  searchOptions: Array<{
    value: string;
    label: string;
    type: "text" | "date";
  }>;
}

const ListSearch: FunctionComponent<ListSearchProps> = ({ onSearch, searchOptions }) => {
  const [selectedValue, setValue] = useState(searchOptions[0]);
  const [type, setType] = useState(searchOptions[0].type);

  function onValueChange(value) {
    setValue(value);
    setType(searchOptions?.find(opt => opt.value === value.value)?.type as "text" | "date");
  }

  function handleEmit(value) {
    if (onSearch) {
      onSearch({ [selectedValue.value]: value });
    }
  }

  return (
    <Input.Group compact>
      {searchOptions && searchOptions.length > 0 && (
        <Select
          defaultValue={searchOptions[0]}
          labelInValue
          style={{ width: "25%" }}
          value={selectedValue}
          onChange={onValueChange}>
          {searchOptions.map(opt => (
            <Select.Option value={opt.value} key={opt.value}>
              {opt.label}
            </Select.Option>
          ))}
        </Select>
      )}
      {type === "text" && (
        <Input.Search
          allowClear
          placeholder="输入关键字"
          onSearch={handleEmit}
          style={{ width: "75%" }}
        />
      )}
      {type === "date" && <DatePicker style={{ width: "75%" }} onChange={handleEmit} />}
    </Input.Group>
  );
};

export default ListSearch;
