import MenuComponent from './menu';

interface SliderMenuProps {
    collapse: boolean;
}

const SliderMenu = ({ collapse }: SliderMenuProps) => {
    return (
        <div className="layout-sider-menu">
            <MenuComponent collapse={collapse} />
        </div>
    )
}
export default SliderMenu
