DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

\c test;

CREATE TABLE products (
    id                  int primary key,
    name                varchar(100) not null,
    slogan              varchar(200) not null,
    description         varchar(500) not null,
    category            varchar(50) not null,
    default_price       int not null check (default_price >= 0)
);

CREATE TABLE features (
    id                  int primary key,
    product_id          int references products(id) not null,
    feature             varchar(50) not null,
    value               varchar(50)
);

CREATE TABLE styles (
    id                  int primary key,
    product_id          int references products(id) not null,
    name                varchar(100) not null,
    sale_price          int CHECK (sale_price is NULL OR sale_price <= original_price),
    original_price      int not null CHECK (original_price >= sale_price and original_price >= 0),
    default_style       boolean not null
);

CREATE TABLE photos (
    id                  int primary key,
    style_id            int references styles(id) not null,
    url                 text not null,
    thumbnail_url       text not null
);

CREATE TABLE skus (
    id                  int primary key,
    style_id            int references styles(id) not null,
    size                varchar(10) not null,
    quantity            int not null
);

CREATE TABLE related (
    id                  int primary key,
    product_id          int references products(id) not null,
    related_product_id  int not null
);

\COPY products FROM 'data/product.csv' WITH (FORMAT CSV, HEADER true, NULL 'null');
\COPY features FROM 'data/features.csv' WITH (FORMAT CSV, HEADER true, NULL 'null');
\COPY styles FROM 'data/styles.csv' WITH (FORMAT CSV, HEADER true, NULL 'null');
\COPY photos FROM 'data/photos.csv' WITH (FORMAT CSV, HEADER true, NULL 'null');
\COPY skus FROM 'data/skus.csv' WITH (FORMAT CSV, HEADER true, NULL 'null');
\COPY related FROM 'data/related.csv' WITH (FORMAT CSV, HEADER true, NULL 'null');



