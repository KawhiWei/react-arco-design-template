import MenuComponent from './menu';

const SliderMenu = () => {
    return (
        <div style={{ height: '100%' }}>
            <div style={{ height: 'calc(100% - 64px)' }}>
                <MenuComponent collapse={false} />
            </div>
        </div>
    )
}
export default SliderMenu