import logo from '@/assets/logo/logo.svg';

const LogoComponent = () => {
    return (
        <div className="logo-wrap">
            <img alt="logo" src={logo} width="30px" height="100%" />
            <h1 className="logo-title">Arco Admin</h1>
        </div>
    )
};
export default LogoComponent;