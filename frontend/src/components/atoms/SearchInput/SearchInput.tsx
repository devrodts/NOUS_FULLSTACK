import { SearchInputInterface } from "./search-input.interface";
import styles from "./SearchInput.module.css";
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({placeholder, value, onChange, onBlur, onFocus, onKeyDown, onKeyUp, className, style}: SearchInputInterface) => {
    return (
        <div className={styles.input_div}>
            <input 
                type="search"
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
                onBlur={onBlur} 
                onFocus={onFocus} 
                onKeyDown={onKeyDown} 
                onKeyUp={onKeyUp} 
                className={`${styles.input} ${className}`} 
                style={style} 
            />
            <SearchIcon className={styles.input_icon} />
        </div>
    )
}

export default SearchInput;