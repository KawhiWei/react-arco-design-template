import './style.less';

import logo from '../../../assets/react.svg';

const LogoComponent = () => {
    return (
        <div className="logo-wrap">
            <img alt="logo" src={logo} width="30px" height="100%" />
            <h1 className="logo-title">React Arco Design</h1>
        </div>
    )
};
export default LogoComponent;
