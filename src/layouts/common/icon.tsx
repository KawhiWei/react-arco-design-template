import { IconApps, IconDashboard, IconSettings } from "@arco-design/web-react/icon";

interface IProp {
    iconName: string;
}

// const ruleConfigCode = `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 80a432 432 0 1 0 0 864 432 432 0 0 0 0-864z" fill="#2080f0"/></svg>`;

const iconMap: any = {
    "ruleConfig": <IconSettings />,
    "dashboard": <IconDashboard />,
    "aiAgent": <IconApps />
};

const IconRenderer = (iconName: string) => {
    const icon = iconMap[iconName];
    return icon || null;
};

const IconComponent = (props: IProp) => {
    return (IconRenderer(props.iconName))

}
export default IconComponent
