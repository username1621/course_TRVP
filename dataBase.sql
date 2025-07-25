PGDMP     5                    }         
   users_data    12.17    12.17     (           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            )           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            *           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            +           1262    147641 
   users_data    DATABASE     �   CREATE DATABASE users_data WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE users_data;
                postgres    false            �            1259    164049 
   cart_items    TABLE     �   CREATE TABLE public.cart_items (
    id integer NOT NULL,
    customerid integer,
    productid integer,
    count integer DEFAULT 1
);
    DROP TABLE public.cart_items;
       public         heap    postgres    false            �            1259    164047    cart_items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.cart_items_id_seq;
       public          postgres    false    207            ,           0    0    cart_items_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;
          public          postgres    false    206            �            1259    172426    orders    TABLE     �   CREATE TABLE public.orders (
    orderid integer NOT NULL,
    customerid integer,
    orderdate date DEFAULT CURRENT_TIMESTAMP,
    deliveryaddress character varying(255),
    totalamount numeric(10,2),
    status character varying(150)
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    164030    products    TABLE     [  CREATE TABLE public.products (
    id integer NOT NULL,
    link_img text,
    ram integer,
    rom integer,
    price numeric,
    brand text,
    series text,
    number_cameras integer,
    number_megapixels text,
    number_megapixels_front_camera text,
    operating_system text,
    number_cores integer,
    max_processor_frequency text
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    164028    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    205            -           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    204            �            1259    155848    users    TABLE     z   CREATE TABLE public.users (
    id integer NOT NULL,
    login text,
    password text,
    email text,
    phone text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    155846    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            .           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            �
           2604    164052    cart_items id    DEFAULT     n   ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);
 <   ALTER TABLE public.cart_items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �
           2604    164033    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            �
           2604    155851    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            $          0    164049 
   cart_items 
   TABLE DATA           F   COPY public.cart_items (id, customerid, productid, count) FROM stdin;
    public          postgres    false    207   �"       %          0    172426    orders 
   TABLE DATA           f   COPY public.orders (orderid, customerid, orderdate, deliveryaddress, totalamount, status) FROM stdin;
    public          postgres    false    208   #       "          0    164030    products 
   TABLE DATA           �   COPY public.products (id, link_img, ram, rom, price, brand, series, number_cameras, number_megapixels, number_megapixels_front_camera, operating_system, number_cores, max_processor_frequency) FROM stdin;
    public          postgres    false    205   7#                  0    155848    users 
   TABLE DATA           B   COPY public.users (id, login, password, email, phone) FROM stdin;
    public          postgres    false    203   g%       /           0    0    cart_items_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cart_items_id_seq', 84, true);
          public          postgres    false    206            0           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 17, true);
          public          postgres    false    204            1           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 34, true);
          public          postgres    false    202            �
           2606    164054    cart_items cart_items_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_pkey;
       public            postgres    false    207            �
           2606    172431    orders orders_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (orderid);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    208            �
           2606    164038    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    205            �
           2606    155856    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            �
           2606    164055 %   cart_items cart_items_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.users(id);
 O   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_customerid_fkey;
       public          postgres    false    203    207    2711            �
           2606    164060 $   cart_items cart_items_productid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_productid_fkey FOREIGN KEY (productid) REFERENCES public.products(id);
 N   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_productid_fkey;
       public          postgres    false    205    2713    207            �
           2606    172432    orders orders_customerid_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.users(id);
 G   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_customerid_fkey;
       public          postgres    false    208    203    2711            $      x������ � �      %      x������ � �      "      x����n�P��㧸�H���e���Y��ce��]�
�n�@_ ۾K_�}�\ ���H /ft�9g�>��렪�-UU]�ӓ�ځ&P���Cǟn!���bK�"q]�0=��𡌜��@��E	�pG���|~��k&G(©	o+{�WVF�k�o�S;��/~#���YD?�űܓ��>�px�^����"(6u�m8wXO�e�]�MF�&�t�4���,����>{�ז~|,�Q��˳�JJ
ˏii�`�a`�!�n��z�oӢU`��5�Z,�f�ս�W�+�5�ʲ��G;Q(��}��>C��5Y�a�������@+��G�{�7 ,u��n	���X8٧��� ��'m�C9 ��h��zMF�/�ih.n��]:���$���_��:����b�0aYQ�Yr���b�4OO?	�u/n�2��.�v����
\�I	P �Da��>�TlBM!��Ҟ��p�MD̻�>z�ԛ�%L>��:�?6��d����8n���`���i�&���ř�f� �$�          �  x�u�َ�@�k|���XRT��5���&��dn ���~�I&�Ig��|��s���*�ޘ��o���C�	�������7I�u4�jc�M��OΘ���APd:?��)���VQ�H����x�T۶O�M�zD�"�`�W����>>����g�Z�zY������~�E��X��#R�+O�k���DRtm���F��(xi?��g�^lD3���I	�k�?ގh���'�җ��r*�8�$ȗ;����F����!pz�6���X�G�ͨ�6D)��WAV�S���H�9����s��!H��嚤y�*����XM.7>�T�D��]���c��=��.�ĭe�9��/��_�P�-�����@��]~�V���NbH�#&��
e2�ݨc^���}?B�%�&O�!�a3>���DvU��V�	�?h����{Cپq&]Բ�6ٲ.d�o�rs=�8����~���?�Up��"��ޱ�޵P^�Mv�x�{�7��f �t��     