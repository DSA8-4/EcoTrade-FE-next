import Image from "next/image";
import Link from "next/link";

const ProductDetail = () => {
  return (
    <>
      <div className="header-content">
        <div className="logo">
          <Link href="/">
            <div>Image</div>
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <Link href="/">홈</Link>
            </li>
            <li>
              <Link href="/">마이페이지</Link>
            </li>
            <li>
              <Link href="/">카테고리</Link>
            </li>
            <li>
              <Link href="/">추천상품 </Link>
            </li>
            <li>
              <Link href="/">EcoPoint란?</Link>
            </li>
          </ul>
        </nav>
        <div className="search">
          <input type="text" placeholder="상품명 검색" />
        </div>
        <div className="user">
          <button className="chat-button">채팅하기</button>
          <Link className="login-link" href="login">
            로그인
          </Link>
          <button className="logout-link">로그아웃</button>
          <Link className="register-link" href="register">
            회원가입
          </Link>
        </div>
        <div className="user-info">
          <Image
            src="/images/profile-icon.png"
            alt="프로필"
            width={40}
            height={40}
          />

          <div></div>
        </div>
      </div>
      <div className="product-container">
        <div className="product-image">
          <Image
            src="/images/profile-icon.png"
            width={40}
            height={40}
            alt="상품 이미지"
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">상품명</h1>
          <div className="product-price">
            15,000 <span>원</span>
          </div>
          <div className="product-firstdetails">
            <div className="product-contents">
              <div className="product-status">
                <span>·</span>
                <span>상품 상태 :</span>
              </div>
              <div></div>
              <div className="product-size">
                <span>·</span>
                <span>사이즈 :</span>
              </div>
              <div className="product-time">
                <span>·</span>
                <span>작성시간 :</span>
              </div>
              <div className="product-location">
                <span>·</span>
                <span>거래지역 :</span>
              </div>
              <div className="product-category">
                <span>·</span>
                <span>카테고리 :</span>
              </div>
            </div>
            <div className="product-seconddetails"></div>

            <p className="product-description">
              상품에 대한 상세 설명 공간입니다. 여기서 추가적인 상품 정보를
              입력할 수 있습니다. 예를 들어, 크기, 색상, 사용 여부 등의 정보가
              포함될 수 있습니다.
            </p>
          </div>
          <div className="button-group">
            <button className="button favorite-button">
              <span>❤ 찜</span>
              <span>1</span>
            </button>
            <button className="button contact-button">채팅하기</button>
            <button className="button buy-button">바로구매</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
