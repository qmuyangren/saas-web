export const lightTheme = {
  token: {
    colorPrimary: '#1890ff',
    colorBgContainer: '#ffffff',
    colorText: 'rgba(0, 0, 0, 0.85)',
    colorBgLayout: '#f0f2f5',
    borderRadius: 6,
  },
  components: {
    Layout: { headerBg: '#ffffff', footerBg: '#ffffff' },
    Menu: { itemBg: '#ffffff' },
  },
}

export const darkTheme = {
  token: {
    colorPrimary: '#1890ff',
    colorBgContainer: '#141414',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorBgLayout: '#000000',
    colorBorder: '#303030',
    borderRadius: 6,
  },
  components: {
    Layout: { headerBg: '#141414', footerBg: '#141414', siderBg: '#141414' },
    Menu: { itemBg: '#141414', itemHoverBg: '#1f1f1f', darkItemBg: '#141414' },
    Card: { colorBgContainer: '#1f1f1f' },
    Table: { headerBg: '#1f1f1f', rowHoverBg: '#1f1f1f' },
    Drawer: { colorBgContainer: '#1f1f1f' },
    Modal: { contentBg: '#1f1f1f', headerBg: '#1f1f1f' },
    Popover: { bg: '#1f1f1f' },
    Input: { colorBgContainer: '#141414', hoverBorderColor: '#1890ff' },
    Select: { selectorBg: '#141414' },
    Button: { algorithm: false },
  },
}
