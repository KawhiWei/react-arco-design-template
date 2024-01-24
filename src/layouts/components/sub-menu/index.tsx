import { Menu } from '@arco-design/web-react';

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

export function SubMenuComponent(item: any, t: any) {
  const { key, meta, children } = item;
  return (
    <SubMenu
      key={key}
      title={
        <span className="sub-menu-icon">
          {meta.icon ? meta.icon : ''}
          {t ? t[meta.name] : meta.title}
        </span>
      }
    >
      {children.map((option: any) => {
        if (option.children) {
          return SubMenuComponent(option, t);
        }
        return (
          <MenuItem key={option.key}>
            {option.meta.icon ? option.meta.icon : ''}
            {t ? t[option.meta.name] : option.meta.title}
          </MenuItem>
        );
      })}
    </SubMenu>
  );
}

