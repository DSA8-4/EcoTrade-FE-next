import styles from "./EcoPoint.module.css";

const EcoPoint = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>포인트 사용 안내</h1>
      <p className={styles.description}>
        EcoTrade에서 적립한 포인트를 어떻게 사용할 수 있는지 알아보세요.
      </p>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <img
            src="/images/EcoPoint탄소절감아이콘.png"
            alt="탄소 배출 절감 아이콘"
            className={styles.cardImage}
          />
          <h2 className={styles.cardTitle}>탄소 배출 절감</h2>
          <p className={styles.cardText}>
            포인트를 사용하여 탄소 배출을 줄이는 다양한 방법을 확인하세요.
          </p>
        </div>
        <div className={styles.card}>
          <img
            src="/images/EcoPoint나무심기아이콘.png"
            alt="나무 심기 아이콘"
            className={styles.cardImage}
          />
          <h2 className={styles.cardTitle}>나무 심기 기부</h2>
          <p className={styles.cardText}>
            포인트를 모아 나무 심기 프로젝트에 기부할 수 있습니다.
          </p>
        </div>
        <div className={styles.card}>
          <img
            src="/images/EcoPoint친환경상품구매아이콘.png"
            alt="친환경 제품 구매 아이콘"
            className={styles.cardImage}
          />
          <h2 className={styles.cardTitle}>친환경 제품 구매</h2>
          <p className={styles.cardText}>
            포인트를 사용하여 친환경 제품을 구매하세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EcoPoint;
