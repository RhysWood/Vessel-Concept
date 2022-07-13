import React from "react";
import '../styles/Button.css'


const STYLES =[
    'bttn--primary', 
    'bttn--outline'
]

const SIZES =[
    'bttn--medium', 
    'bttn--large'
]

const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
        
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <button className={`bttn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}

export default Button;