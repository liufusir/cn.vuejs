// 定义一个函数来创建侧边栏分组
function createSidebarGroup(text, base, items) {
    return {
      text,
      base,
      items
    };
  }
  
  // 定义每个分组的 items
  const startItems = [
    { text: "简介", link: "introduction" },
    { text: "快速上手", link: "quick-start" }
  ];

  //基础
  const essentialsItems = [
    { text: "创建一个应用", link: "application" },
    { text: "模板语法", link: "template-syntax" },
    { text: "响应式基础", link: "reactivity-fundamentals" },
    { text: "计算属性", link: "computed" },
    { text: "类与样式绑定", link: "class-and-style" },
    { text: "条件渲染", link: "conditional" },
    { text: "列表渲染", link: "list" },
    { text: "事件处理", link: "event-handling" },
    { text: "表单输入绑定", link: "forms" },
    { text: "生命周期", link: "lifecycle" },
    { text: "侦听器", link: "watchers" },
    { text: "模板引用", link: "template-refs" },
    { text: "组件基础", link: "component-basics" }
  ];
  //深入组件
  const componentsItems = [
    { text: "注册", link: "registration" },
    { text: "Props", link: "props" },
    { text: "事件", link: "events" },
    { text: "组件 v-model", link: "v-model" },
    { text: "透传 Attributes", link: "attrs" },
    { text: "插槽", link: "slots" },
    { text: "依赖注入", link: "provide-inject" },
    { text: "异步指令", link: "async" }
  ];
  //逻辑复用
  const reusabilityItems = [
    { text: "组合式函数", link: "composables" },
    { text: "自定义指令", link: "custom-directives" },
    { text: "插件", link: "plugins" }
  ];
  //内置组件
  const builtInsItems = [
    { text: "Transition", link: "transition" },
    { text: "Transition-group", link: "transition-group" }
  ];
  
  // 导出侧边栏数据
  export const docsSidebarData = {
    // 侧边栏分组
    "/": [false],
    "/guide/": [
      createSidebarGroup("开始", "/guide/", startItems),
      createSidebarGroup("基础", "/guide/essentials/", essentialsItems),
      createSidebarGroup("深入组件", "/guide/components/", componentsItems),
      createSidebarGroup("逻辑复用", "/guide/reusability/", reusabilityItems),
      createSidebarGroup("内置组件", "/guide/built-ins/", builtInsItems)
    ]
  };