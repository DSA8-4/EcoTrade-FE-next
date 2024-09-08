import styles from './ETDetail.module.css';

const ETDetail = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <section className={styles.box}>
          <div className={styles.content}>
            <h2 className={styles.heading}>EcoTrade</h2>
            <p className={styles.p}>
              EcoTrade(에코 트레이드)는 여러분을 위한 녹색 중고거래 플랫폼입니다.
            </p>
          </div>
        </section>

        <section className={styles.box}>
          <div className={styles.content}>
            <h2 className={styles.heading}>안 입는 옷, 안 신는 신발, 안 쓴지 오래된 물건들</h2>
            <p className={styles.p}>
              자리차지만 하고 있는 잡동사니, 쓰레기로 버리기 보다는 필요한 사람을 찾아보세요!
            </p>
          </div>
          <div className={styles.imagePlaceholder}>이미지 삽입</div>
        </section>

        <section className={styles.box}>
          <div className={styles.content}>
            <h2 className={styles.heading}>어떻게 거래하나요?</h2>
            <p className={styles.p}>
              에코트레이드는 채팅과 지도를 이용한 직거래 시스템을 지원합니다. 당신 근처에서
              시작해보세요!
            </p>
          </div>
          <div className={styles.imagePlaceholder}>이미지 삽입</div>
        </section>

        <section className={styles.box}>
          <div className={styles.content}>
            <h2 className={styles.heading}>EcoPoint를 모아보세요!</h2>
            <p className={styles.p}>
              EcoPoint는 거래 완료 후 상호 동의 하에 구매자와 판매자 모두에게 적립됩니다.
            </p>
            <p className={styles.p}>
              포인트를 모아 기부해주시면, 나무심기나 쓰레기 정화작업 등의 사업에 도움을 줄 수
              있습니다.
            </p>
            <p className={styles.p}>
              EcoTrade공식 SNS에서 전해드리는 환경 정화 작업 소식을 만나보세요!
            </p>
            <div className={styles.sns}>sns link삽입</div>
          </div>
          <div className={styles.imagePlaceholder}>이미지 삽입</div>
        </section>
      </div>
    </div>
  );
};

export default ETDetail;
