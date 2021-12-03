import { useState, useEffect } from 'react';
import styles from './Search.module.scss';

const Search = (props) => {
  const [searchVal, setSearchVal] = useState("");
  return (
    <div className={`${styles.Search} ${props.className}`}>
      <header>
        <b>Search for a song</b>{' '}
      </header>
      <div>
        <input type="text" defaultValue="Search" value={searchVal} onChange={e => {setSearchVal(e.target.value)}}/>
      </div>
    </div>
  );
};

export default Search;
//
