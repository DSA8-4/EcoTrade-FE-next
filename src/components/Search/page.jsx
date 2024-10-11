'use client';

import { useRouter } from 'next/navigation';
import styles from './search.module.css';

const Search = () => {
  const router = useRouter();
  const searchText = (e) => {
    if (e.key === 'Enter') {
      router.push(`/product?search=${e.target.value}`);
    }
  };

  return (
    <div className={styles.search}>
      <input
        onKeyDown={searchText}
        type="text"
        placeholder="상품명 검색"
      />
    </div>
  );
};
export default Search;
