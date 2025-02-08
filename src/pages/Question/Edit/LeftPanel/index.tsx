import React, { FC } from "react";
import ComponentLib from "../ComponentLib";
import Layers from "../Layers";
import { Tabs } from "@arco-design/web-react";
import { IconApps, IconUnorderedList } from "@arco-design/web-react/icon";

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: "componentLib",
      label: (
        <span>
          <IconApps />
          组件库
        </span>
      ),

      children: <ComponentLib />,
    },
    {
      key: "layers",
      label: (
        <span>
          <IconUnorderedList />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ];

  return (
    <Tabs defaultActiveTab="componentLib">
      {tabsItems.map(item => (
        <Tabs.TabPane key={item.key} title={item.label}>
          {item.children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

export default LeftPanel;
