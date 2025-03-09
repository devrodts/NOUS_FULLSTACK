import { InputInterface } from "./interface";


const Input = ({type, value, onChange, placeholder, name, className, style, onBlur, onFocus, onKeyDown, onKeyUp}: InputInterface) => {
    return(
        <input 
            type={type} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            name={name} 
            className={className} 
            style={style} 
            onBlur={onBlur} 
            onFocus={onFocus} 
            onKeyDown={onKeyDown} 
            onKeyUp={onKeyUp} />
    )
}   

export default Input;