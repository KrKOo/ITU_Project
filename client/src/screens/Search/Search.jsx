import { useState, useEffect, useRef } from 'react';
import styles from './Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import Upload from '../../components/Upload';

const Search = (props) => {
  const [searchVal, setSearchVal] = useState('');
  const [add, setAdd] = useState(false);

  const ref = useRef(null);
  //-----Stavy pre upload-------

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setAdd(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  return (
    <div className={`${styles.Search} ${props.className}`}>
      <div className={styles.contentContainer}>
        <h2>Search for a song</h2>
        <div className={styles.inputContainer}>
          <input
            type='text'
            defaultValue='Search'
            value={searchVal}
            placeholder='Song name'
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />

          <button
            className={add ? styles.activeButton : ''}
            onClick={(e) => {
              setAdd(!add);
            }}>
            <FontAwesomeIcon
              icon={faUpload}
              size='1x'
              className={styles.twitterButton}
            />
            Upload
          </button>
        </div>

        <div ref={ref}>{add && <Upload className={styles.Upload} />}</div>
      </div>
    </div>
  );
};
export default Search;
//
