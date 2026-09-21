# 1주차 ERD 미션 - 요구사항을 데이터로 바꾸기

## 1. 화면 및 요구사항 분석

### 1-1. 회원가입 / 로그인
- 회원은 기본 정보를 입력하고, 소셜 로그인을 통해 가입한다.
- 필요한 데이터:
  - 회원 식별 및 기본 정보
  - 소셜 제공자 정보 (카카오, 네이버, 애플, 구글)
  - 닉네임
  - 성별
  - 생년월일
  - 지역
  - 선호 음식 카테고리
- 이 정보는 회원 단위로 보관되며, 소셜 계정은 여러 개 연결될 수 있으므로 별도 테이블로 분리하는 것이 적절하다.

### 1-2. 홈 / 지역 / 가게 화면
- 지역별로 가게 목록을 보여줘야 한다.
- 가게는 특정 지역과 음식 카테고리에 속한다.
- 필요한 데이터:
  - 지역명
  - 가게명, 주소, 설명
  - 가게의 음식 카테고리
- 따라서 `region`, `store`, `food_category` 엔티티가 필요하다.

### 1-3. 미션 화면
- 각 가게마다 수행 가능한 미션이 있다.
- 회원은 미션을 시작하고, 진행 중 또는 완료 상태를 관리한다.
- 필요한 데이터:
  - 미션 식별 정보
  - 어떤 가게의 미션인지
  - 어떤 회원이 어떤 미션을 수행 중인지
  - 상태 값 (`IN_PROGRESS`, `COMPLETED`, `REVIEWED`)
- 회원과 미션의 관계는 N:M이므로 `member_mission` 매핑 테이블을 둔다.

### 1-4. 리뷰 화면
- 완료한 미션을 바탕으로 가게에 대한 리뷰를 작성한다.
- 필요한 데이터:
  - 리뷰 작성자
  - 대상 가게
  - 관련 미션
  - 평점
  - 리뷰 내용
  - 리뷰 이미지
- 리뷰는 회원과 가게, 미션과 연동되며, 이미지가 여러 장일 수 있으므로 `review_image`를 별도로 설계한다.

---

## 2. 엔티티 도출 과정

### member
- 로그인한 사용자를 나타내는 핵심 엔티티다.
- 회원은 지역을 갖고, 닉네임, 성별, 생년월일 등의 정보를 가진다.
- 실제 삭제를 즉시 수행하면 데이터 추적이 어려우므로 `deleted_at`을 두어 soft delete를 고려한다.

### social_account
- 회원은 소셜 계정을 여러 개 가질 수 있다.
- 예: 같은 회원이 카카오 + 애플 계정으로 로그인 가능
- 소셜 정보와 회원 정보를 한 테이블에 놓으면 데이터가 비정규화되고, 한 회원이 여러 소셜 계정을 관리하기 어렵다.
- 따라서 회원과 1:N 관계를 갖는 `social_account`를 분리한다.

### region
- 서비스의 지역 단위 엔티티다.
- 회원과 가게는 각각 지역에 속하므로 `region 1:N member`, `region 1:N store` 구조를 가진다.

### food_category
- 음식 종류를 관리하는 기준 데이터다.
- 예: 한식, 중식, 일식, 양식
- 가게는 음식 카테고리에 속하고, 회원은 선호 카테고리를 여러 개 선택할 수 있다.

### member_food_category
- 회원과 음식 카테고리는 N:M 관계다.
- 한 회원이 여러 선호 음식 카테고리를 가질 수 있고, 하나의 카테고리를 여러 회원이 선택할 수 있다.
- 따라서 중간 테이블 `member_food_category`를 사용한다.

### store
- 지역별로 운영되는 가게 엔티티다.
- 각 가게는 지역과 음식 카테고리를 가진다.
- 가게 단위로 미션과 리뷰가 연결된다.

### mission
- 특정 가게에서 수행할 수 있는 미션을 정의한다.
- 미션은 `store_id`를 가진다.
- 보상 포인트와 만료 시점을 함께 저장해, 오늘의 미션/완료 미션을 관리할 수 있게 한다.

### member_mission
- 회원이 어떤 미션을 수행하고 있는지 기록하는 매핑 테이블이다.
- 회원과 미션의 관계는 N:M이므로 직접 연결하지 않고 중간 테이블을 둔다.
- 상태를 저장하여 진행 중 / 완료 / 리뷰 완료 여부를 추적한다.

### review
- 가게 리뷰를 작성하는 엔티티다.
- 리뷰는 완료된 특정 미션에 대한 기록으로 연결되며, `member_mission_id`를 통해 회원과 가게 정보를 간접적으로 파악한다.
- `member_mission`을 통해 회원을 알 수 있고, `member_mission -> mission -> store` 경로를 통해 가게도 확인 가능하므로 `member_id`와 `store_id`를 별도로 중복 저장하지 않는다.
- 이 방식은 데이터 불일치 가능성을 줄이고 정규화 관점에서 더 안전하다.

### review_image
- 리뷰는 여러 이미지를 가질 수 있으므로 별도 테이블로 분리한다.
- 이미지 URL과 노출 순서 정보를 저장한다.

---

## 3. 관계 분석

### 3-1. 1:1
- 이번 설계에서는 크게 1:1 관계를 명시적으로 만들지 않는다.
- 회원-소셜 계정은 1:N으로 두며, 회원별로 여러 소셜 로그인 수단을 연결할 수 있다.

### 3-2. 1:N
- `region 1:N member`
- `region 1:N store`
- `member 1:N social_account`
- `food_category 1:N store`
- `store 1:N mission`
- `member 1:N review`
- `store 1:N review`
- 이 관계는 자식 테이블에 FK를 두어 구현한다.

### 3-3. N:M
- `member ↔ food_category`는 N:M 관계다.
- 회원은 선호 음식 카테고리를 여러 개 가질 수 있고, 카테고리도 여러 회원에게 선택될 수 있다.
- `member ↔ mission`도 N:M 관계다.
  - 한 회원이 여러 미션을 수행할 수 있고,
  - 한 미션은 여러 회원이 수행할 수 있다.
- 따라서 각각을 중간 테이블로 분리했다.

#### 왜 `member_food_category`를 써야 하는가?
- 회원의 선호 음식 카테고리는 단순한 문자열 배열로 저장하면 중복, 정렬, 관리가 어렵다.
- 정규화된 구조로 관리하기 위해 `member_food_category`를 둔다.

#### 왜 `member_mission`를 써야 하는가?
- 회원과 미션은 단순히 연결만 하는 관계가 아니라 상태를 관리해야 한다.
- 진행 상태, 시작 시점, 완료 시점 등 속성이 필요하기 때문에 중간 테이블이 적절하다.
- 이렇게 하면 같은 회원이 같은 미션을 여러 번 수행하는 경우도 제어 가능하다.

---

## 4. 최종 테이블 설계

### 1) member

| 컬럼명 | 타입 | PK/FK | NULL | UNIQUE | 설명 |
|---|---|---|---|---|---|
| id | BIGINT AUTO_INCREMENT | PK | NO | YES | 회원 고유 식별자 |
| region_id | BIGINT | FK (`region.id`) | NO | NO | 회원이 소속된 지역 |
| nickname | VARCHAR(50) | - | NO | NO | 닉네임 |
| gender | ENUM('MALE','FEMALE','NONE') | - | NO | NO | 성별 |
| birth_date | DATE | - | YES | NO | 생년월일 |
| created_at | DATETIME | - | NO | NO | 생성 시각 |
| updated_at | DATETIME | - | NO | NO | 수정 시각 |
| deleted_at | DATETIME | - | YES | NO | 탈퇴/소프트 삭제 시각 |

### 2) social_account

| 컬럼명 | 타입 | PK/FK | NULL | UNIQUE | 설명 |
|---|---|---|---|---|---|
| id | BIGINT AUTO_INCREMENT | PK | NO | YES | 소셜 계정 고유 식별자 |
| member_id | BIGINT | FK (`member.id`) | NO | NO | 회원 식별자 |
| provider | ENUM('KAKAO','NAVER','APPLE','GOOGLE') | - | NO | NO | 소셜 로그인 제공자 |
| provider_user_id | VARCHAR(255) | - | NO | NO | 소셜 플랫폼 사용자 식별자 |
| email | VARCHAR(255) | - | YES | NO | 소셜 계정 이메일 |
| created_at | DATETIME | - | NO | NO | 생성 시각 |

- `UNIQUE(provider, provider_user_id)` 적용

### 3) region

| 컬럼명 | 타입 | PK/FK | NULL | UNIQUE | 설명 |
|---|---|---|---|---|---|
| id | BIGINT AUTO_INCREMENT | PK | NO | YES | 지역 고유 식별자 |
| name | VARCHAR(100) | - | NO | YES | 지역 이름 |

### 4) food_category

| 컬럼명 | 타입 | PK/FK | NULL | UNIQUE | 설명 |
|---|---|---|---|---|---|
| id | BIGINT AUTO_INCREMENT | PK | NO | YES | 음식 카테고리 고유 식별자 |
| name | VARCHAR(100) | - | NO | YES | 카테고리명 (한식, 중식 등) |

### 5) member_food_category

| 컬럼명 | 타입 | PK/FK | NULL | UNIQUE | 설명 |
|---|---|---|---|---|---|
| id | BIGINT AUTO_INCREMENT | PK | NO | YES | 매핑 고유 식별자 |
| member_id | BIGINT | FK (`member.id`) | NO | NO | 회원 식별자 |
| food_category_id | BIGINT | FK (`food_category.id`) | NO | NO | 음식 카테고리 식별자 |

- `UNIQUE(member_id, food_category_id)` 적용

### 6) store

| 컬럼명 | 타입 | PK/FK | NULL | UNIQUE | 설명 |
|---|---|---|---|---|---|
| id | BIGINT AUTO_INCREMENT | PK | NO | YES | 가게 고유 식별자 |
| region_id | BIGINT | FK (`region.id`) | NO | NO | 지역 식별자 |
| food_category_id | BIGINT | FK (`food_category.id`) | NO | NO | 음식 카테고리 식별자 |
| name | VARCHAR(100) | - | NO | NO | 가게 이름 |
| address | VARCHAR(255) | - | NO | NO | 주소 |
| description | TEXT | - | YES | NO | 가게 설명 |
| created_at | DATETIME | - | NO | NO | 생성 시각 |
| updated_at | DATETIME | - | NO | NO | 수정 시각 |
| deleted_at | DATETIME | - | YES | NO | 삭제 시각 (soft delete) |

### 7) mission

| 컬럼명 | 타입 | PK/FK | NULL | UNIQUE | 설명 |
|---|---|---|---|---|---|
| id | BIGINT AUTO_INCREMENT | PK | NO | YES | 미션 고유 식별자 |
| store_id | BIGINT | FK (`store.id`) | NO | NO | 가게 식별자 |
| title | VARCHAR(100) | - | NO | NO | 미션 제목 |
| description | TEXT | - | NO | NO | 미션 설명 |
| reward_point | INT | - | NO | NO | 지급 포인트 |
| expired_at | DATETIME | - | YES | NO | 미션 만료 시각 |
| created_at | DATETIME | - | NO | NO | 생성 시각 |
| updated_at | DATETIME | - | NO | NO | 수정 시각 |

### 8) member_mission

| 컬럼명 | 타입 | PK/FK | NULL | UNIQUE | 설명 |
|---|---|---|---|---|---|
| id | BIGINT AUTO_INCREMENT | PK | NO | YES | 회원-미션 상태 식별자 |
| member_id | BIGINT | FK (`member.id`) | NO | NO | 회원 식별자 |
| mission_id | BIGINT | FK (`mission.id`) | NO | NO | 미션 식별자 |
| status | ENUM('IN_PROGRESS','COMPLETED','REVIEWED') | - | NO | NO | 수행 상태 |
| started_at | DATETIME | - | NO | NO | 수행 시작 시각 |
| completed_at | DATETIME | - | YES | NO | 수행 완료 시각 |

- `UNIQUE(member_id, mission_id)` 적용

### 9) review

| 컬럼명 | 타입 | PK/FK | NULL | UNIQUE | 설명 |
|---|---|---|---|---|---|
| id | BIGINT AUTO_INCREMENT | PK | NO | YES | 리뷰 고유 식별자 |
| member_mission_id | BIGINT | FK (`member_mission.id`) | NO | YES | 연관 완료 미션 |
| rating | TINYINT | - | NO | NO | 평점 (1~5) |
| content | TEXT | - | YES | NO | 리뷰 내용 |
| created_at | DATETIME | - | NO | NO | 생성 시각 |
| updated_at | DATETIME | - | NO | NO | 수정 시각 |
| deleted_at | DATETIME | - | YES | NO | 삭제 시각 (soft delete) |

- `UNIQUE(member_mission_id)` 적용
- `rating`은 1~5 범위 제한
- `member_id`, `store_id`는 중복 저장하지 않음

### 10) review_image

| 컬럼명 | 타입 | PK/FK | NULL | UNIQUE | 설명 |
|---|---|---|---|---|---|
| id | BIGINT AUTO_INCREMENT | PK | NO | YES | 리뷰 이미지 식별자 |
| review_id | BIGINT | FK (`review.id`) | NO | NO | 리뷰 식별자 |
| image_url | VARCHAR(500) | - | NO | NO | 이미지 경로 |
| sort_order | INT | - | NO | NO | 이미지 노출 순서 |

---

## 5. 관계 정리

- `region 1:N member`
- `region 1:N store`
- `member 1:N social_account`
- `member N:M food_category -> member_food_category`
- `food_category 1:N store`
- `store 1:N mission`
- `member N:M mission -> member_mission`
- `member_mission 1:0..1 review`
- `review 1:N review_image`

> `member`와 `store`는 `member_mission` 경로를 통해 간접적으로 연결되므로, `review` 테이블에는 `member_id`와 `store_id`를 별도 저장하지 않는다.

---

## 6. 제약조건 및 설계 판단

### NOT NULL / NULL
- 회원의 기본 정보 (`nickname`, `region_id`, `gender`)는 필수값으로 두었다.
- 생년월일, 소셜 이메일, 가게 설명, 미션 만료 시점은 선택값으로 두어 입력이 없더라도 데이터가 유지되도록 했다.
- `review.deleted_at`은 soft delete용 선택값이다.

### UNIQUE
- `(provider, provider_user_id)`를 통해 같은 소셜 계정이 중복 생성되지 않도록 한다.
- `(member_id, food_category_id)` 중복 선호 카테고리 저장 방지
- `(member_id, mission_id)` 중복 수행 이력 방지
- `member_mission_id` 단일 리뷰 보장
- 닉네임은 서비스 정책상 중복 허용이 가능하므로 UNIQUE로 두지 않았고, 별도 정책이 필요하면 추후 제약을 추가할 수 있다.

### FK
- 모든 부모 엔티티를 기준으로 자식 테이블이 FK를 가지도록 설계했다.
- 예: `member_id`는 `member`의 PK를 참조, `store_id`는 `store`의 PK를 참조.
- 이런 구조는 `1:N` 관계를 비식별 관계로 표현할 때 가장 자연스럽다.

### Soft Delete
- `member`, `store`, `review`에 `deleted_at`을 두어 실제 row 삭제 대신 상태를 남긴다.
- 회원 탈퇴와 가게/리뷰 삭제는 로그 추적과 데이터 무결성을 위해 soft delete가 적합하다.

### N:M 매핑 테이블
- 회원-음식 카테고리, 회원-미션은 모두 N:M 관계이므로 매핑 테이블을 두어 확장성과 무결성을 확보했다.
- 특히 `member_mission`은 상태를 보관해야 하므로 단순 연결 테이블보다 더 의미 있는 엔티티로 설계되었다.

---

## 7. 제외한 기능

이번 ERD 설계 범위에서 제외한 기능은 아래와 같다.

- 지도 기능
- 검색 기능
- 포인트 내역 관리
- 알림 및 알림 설정
- 사장님 점포 관리
- 점주용 기능

이 기능들은 이번 워크북의 핵심 요구사항인 회원/가게/미션/리뷰 흐름과 별도로 관리되거나, 별도 서비스 권한/도메인이므로 이번 설계 범위에서 제외했다.

---

## 8. 최종 체크리스트

- [x] ERD 테이블명/컬럼명 snake_case
- [x] 모든 PK는 `id`로 통일
- [x] 모든 PK 타입은 `BIGINT AUTO_INCREMENT`
- [x] 1:N 관계는 자식 테이블에 FK 배치
- [x] 1:N 관계는 비식별관계로 설계 고려
- [x] N:M 관계는 매핑 테이블 사용
- [x] `member_food_category`로 선호 카테고리 관리
- [x] `member_mission`으로 수행 상태 관리
- [x] NOT NULL / NULL 구분 반영
- [x] Soft Delete(`deleted_at`) 반영
- [x] MySQL 8 문법 기준으로 설계
- [x] 리뷰 기능과 리뷰 이미지 기능 포함
- [x] 지도/검색/포인트/알림/점주 관리 제외
