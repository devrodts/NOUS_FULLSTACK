
interface SearchInputInterface {
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
    style?: React.CSSProperties;
}

import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({placeholder, value, onChange, onBlur, onFocus, onKeyDown, onKeyUp, className, style}: SearchInputInterface) => {
    return (
        <div>
            <input 
                type="search"
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
                onBlur={onBlur} 
                onFocus={onFocus} 
                onKeyDown={onKeyDown} 
                onKeyUp={onKeyUp} 
                className={className} 
                style={style} 
            />
            <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500" />
        </div>
    )
}

export default SearchInput;