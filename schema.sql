DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

\c test;

CREATE TABLE products (
    id                  int primary key,
    name                varchar(100) not null,
    slogan              varchar(100) not null,
    description         varchar(200) not null,
    category            varchar(50) not null --normalize, enumerate,
    default_price       varchar(20) not null
);

CREATE TABLE features (
    id                  bigserial primary key,
    product_id          int references products(id) not null,
    feature             varchar(50) not null,
    value               varchar(50) not null
);

CREATE TABLE styles (
    id                  bigserial primary key,
    product_id          int references products(id) not null,
    name                varchar(100) not null,
    original_price      varchar(20) not null,
    sale_price          varchar(20) -- always less, always pos,
    def                 boolean not null
);

CREATE TABLE photos (
    id                  bigserial primary key,
    style_id            int references styles(id) not null,
    thumbnail_url       varchar(100) not null,
    url                 varchar(100) not null
);

CREATE TABLE skus (
    id                  bigserial primary key,
    style_id            int references styles(id) not null,
    quantity            int not null,
    size                varchar(10) not null
);

CREATE TABLE related (
    -- maintain order
    id                  bigserial primary key,
    product_id          int references products(id) not null,
    related_product_id  int
);

INSERT INTO products (id, name, slogan, description, category, default_price) VALUES (48444, 'Camo Onsie', 'Can You See Me Now?', 'Army ready. Beautiful majestic patterns. Lost in the trees and shrubbery.', 'Onsie', '190');

INSERT INTO features (product_id, feature, value) VALUES (48444, 'Material', 'Bulletproof');
INSERT INTO features (product_id, feature, value) VALUES (48444, 'Weight', 'Heavy');

INSERT INTO styles (product_id, name, original_price, sale_price, def) VALUES (48444, 'Forest Green & Black', '140', '20', true);
INSERT INTO styles (product_id, name, original_price, sale_price, def) VALUES (48444, 'Blue and Sand', '190', '50', true);

INSERT INTO photos (style_id, thumbnail_url, url) VALUES (1, 'urlplaceholder/style_1_photo_number_thumbnail.jpg', 'urlplaceholder/style_1_photo_number.jpg');
INSERT INTO photos (style_id, thumbnail_url, url) VALUES (1, 'urlplaceholder/style_1_photo_number_thumbnail.jpg', 'urlplaceholder/style_1_photo_number.jpg');

INSERT INTO skus (style_id, quantity, size) VALUES (1, 8, 'XS');
INSERT INTO skus (style_id, quantity, size) VALUES (1, 12, 'L');

INSERT INTO related (product_id, related_product_id) VALUES (48444, 27);
INSERT INTO related (product_id, related_product_id) VALUES (48444, 35);
