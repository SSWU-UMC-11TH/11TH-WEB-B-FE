-- MySQL 8 기준 ERD 설계 스키마
-- 부모 테이블부터 생성하여 FK 참조 순서를 유지

CREATE TABLE region (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE food_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE member (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    region_id BIGINT NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    gender ENUM('MALE', 'FEMALE', 'NONE') NOT NULL DEFAULT 'NONE',
    birth_date DATE NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    CONSTRAINT fk_member_region
        FOREIGN KEY (region_id) REFERENCES region (id)
);

CREATE TABLE social_account (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    provider ENUM('KAKAO', 'NAVER', 'APPLE', 'GOOGLE') NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_social_account_member
        FOREIGN KEY (member_id) REFERENCES member (id),
    CONSTRAINT uq_social_account_provider_user_id
        UNIQUE (provider, provider_user_id)
);

CREATE TABLE member_food_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    food_category_id BIGINT NOT NULL,
    CONSTRAINT fk_member_food_category_member
        FOREIGN KEY (member_id) REFERENCES member (id),
    CONSTRAINT fk_member_food_category_food_category
        FOREIGN KEY (food_category_id) REFERENCES food_category (id),
    CONSTRAINT uq_member_food_category
        UNIQUE (member_id, food_category_id)
);

CREATE TABLE store (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    region_id BIGINT NOT NULL,
    food_category_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    description TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    CONSTRAINT fk_store_region
        FOREIGN KEY (region_id) REFERENCES region (id),
    CONSTRAINT fk_store_food_category
        FOREIGN KEY (food_category_id) REFERENCES food_category (id)
);

CREATE TABLE mission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    store_id BIGINT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    reward_point INT NOT NULL,
    expired_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_mission_store
        FOREIGN KEY (store_id) REFERENCES store (id)
);

CREATE TABLE member_mission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    mission_id BIGINT NOT NULL,
    status ENUM('IN_PROGRESS', 'COMPLETED', 'REVIEWED') NOT NULL DEFAULT 'IN_PROGRESS',
    started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    CONSTRAINT fk_member_mission_member
        FOREIGN KEY (member_id) REFERENCES member (id),
    CONSTRAINT fk_member_mission_mission
        FOREIGN KEY (mission_id) REFERENCES mission (id),
    CONSTRAINT uq_member_mission
        UNIQUE (member_id, mission_id)
);

CREATE TABLE review (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_mission_id BIGINT NOT NULL,
    rating TINYINT NOT NULL,
    content TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    CONSTRAINT fk_review_member_mission
        FOREIGN KEY (member_mission_id) REFERENCES member_mission (id),
    CONSTRAINT uq_review_member_mission
        UNIQUE (member_mission_id),
    CONSTRAINT chk_review_rating
        CHECK (rating BETWEEN 1 AND 5)
);

CREATE TABLE review_image (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    review_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_review_image_review
        FOREIGN KEY (review_id) REFERENCES review (id)
);
