CREATE DATABASE "ECommerceDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

\c ECommerceDB;

CREATE SEQUENCE categories_id_seq;
CREATE SEQUENCE products_id_seq;
CREATE SEQUENCE users_id_seq;

CREATE TABLE IF NOT EXISTS public.categories
(
    id integer NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categories
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.products
(
    id integer NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    price numeric NOT NULL,
    stockquantity integer NOT NULL,
    categoryid integer NOT NULL,
    imageurl text COLLATE pg_catalog."default",
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT products_categoryid_fkey FOREIGN KEY (categoryid)
    REFERENCES public.categories (id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    role text COLLATE pg_catalog."default" NOT NULL,
    createdat date,
    CONSTRAINT users_pkey PRIMARY KEY (id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

INSERT INTO public.users(
    id, username, email, password, role, createdat)
VALUES (1, 'AKS', 'aks@gmail.com', '$2a$11$eblypG/ksXWjALAJ7YpB1e7Epn/6iKsx8W5XvPDEQVM3iv0y.JaFa', 'ADMIN', '2025-05-14');