import React, { FC, useEffect, useState } from "react";
import { useGetComponentInfo } from "@/hooks";
import ComponentProp from "../ComponentProp";
import PageSetting from "../PageSetting";
import { IconFile, IconSettings } from "@arco-design/web-react/icon";
import { Tabs } from "@arco-design/web-react";
// TS 枚举
enum TAB_KEYS {
  PROP_KEY = "prop",
  SETTING_KEY = "setting",
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
  const { selectedId } = useGetComponentInfo();

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY);
    else setActiveKey(TAB_KEYS.SETTING_KEY);
  }, [selectedId]);

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <IconFile />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <IconSettings />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];

  return (
    <Tabs activeTab={activeKey}>
      {tabsItems.map(item => {
        return (
          <Tabs.TabPane key={item.key} title={item.label}>
            {item.children}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
};

export default RightPanel;
