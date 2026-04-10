export enum MenuType {
  CATALOGUE = 0,
  MENU = 1,
  BUTTON = 2,
}

export const DEFAULT_OPENED_MENU = ['dashboard']

export const MENU_ICON_MAP: Record<string, string> = {
  dashboard: 'DashboardOutlined',
  user: 'UserOutlined',
  system: 'SettingOutlined',
  config: 'ToolOutlined',
  role: 'TeamOutlined',
  menu: 'AppstoreOutlined',
}
