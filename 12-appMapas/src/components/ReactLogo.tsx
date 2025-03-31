import logo from '../assets/react.svg';

export const ReactLogo = () => {
    return (
        <img 
            src={logo} 
            alt="Logo de React"
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '130px'
            }}
        />
    )
}