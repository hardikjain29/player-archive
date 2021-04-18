import React, { useRef } from 'react';
import './searchBox.css';

interface Props {
 onSearch: (id: string) => Promise<void>;
}

const SearchBox: React.FC<Props> = ({ onSearch } : Props) => {
    const searchRef = useRef<HTMLInputElement>(null);
    return (
        <div className='search-form'>
            <div className="form">
                <input ref={searchRef} placeholder='Search for player' type='text' />
                <div className="go" onClick={() => onSearch(searchRef.current?.value || '')}>
                    Go
                </div>
            </div>
        </div>
    )
}

export default SearchBox;