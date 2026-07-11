--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5
--
-- Hosting-safe variant: removed pg17-only 'transaction_timeout' setting and
-- 'OWNER TO postgres' lines so this runs on any Postgres 13+ instance under
-- whatever role your hosting provider gives you.

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16527)
-- Name: Chat Participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Chat Participants" (
    id integer NOT NULL,
    user_id uuid NOT NULL,
    chat_id uuid NOT NULL
);

--
-- TOC entry 219 (class 1259 OID 16526)
-- Name: Chat Participants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Chat Participants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 219
-- Name: Chat Participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Chat Participants_id_seq" OWNED BY public."Chat Participants".id;

--
-- TOC entry 218 (class 1259 OID 16519)
-- Name: Chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Chats" (
    id uuid NOT NULL,
    name character varying(20),
    is_group_chat boolean DEFAULT false NOT NULL,
    created_at time without time zone DEFAULT now() NOT NULL,
    owner uuid,
    expires_on timestamp with time zone,
    chat_picture_url text
);

--
-- TOC entry 221 (class 1259 OID 16544)
-- Name: Friendships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Friendships" (
    user_id uuid NOT NULL,
    friend_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT no_self_freindship CHECK ((user_id <> friend_id))
);

--
-- TOC entry 223 (class 1259 OID 16581)
-- Name: Message Media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Message Media" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    message_id uuid NOT NULL,
    media_url text NOT NULL,
    media_type character varying(10) NOT NULL,
    uploaded_at timestamp with time zone DEFAULT now() NOT NULL
);

--
-- TOC entry 222 (class 1259 OID 16562)
-- Name: Messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Messages" (
    id uuid NOT NULL,
    content text,
    sender_id uuid NOT NULL,
    chat_id uuid NOT NULL,
    sent_at timestamp without time zone DEFAULT now() NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    expire_by timestamp without time zone,
    media_key text,
    media_type text,
    CONSTRAINT messages_media_type_check CHECK (((media_type IS NULL) OR (media_type = ANY (ARRAY['image'::text, 'video'::text]))))
);

--
-- TOC entry 217 (class 1259 OID 16512)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(60) NOT NULL,
    profile_picture_url text,
    bio text,
    delete_timer_seconds integer
);

--
-- TOC entry 4765 (class 2604 OID 16530)
-- Name: Chat Participants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chat Participants" ALTER COLUMN id SET DEFAULT nextval('public."Chat Participants_id_seq"'::regclass);

--
-- TOC entry 4778 (class 2606 OID 16532)
-- Name: Chat Participants Chat Participants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chat Participants"
    ADD CONSTRAINT "Chat Participants_pkey" PRIMARY KEY (id);

--
-- TOC entry 4776 (class 2606 OID 16525)
-- Name: Chats Chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chats"
    ADD CONSTRAINT "Chats_pkey" PRIMARY KEY (id);

--
-- TOC entry 4780 (class 2606 OID 16600)
-- Name: Friendships Friendships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Friendships"
    ADD CONSTRAINT "Friendships_pkey" PRIMARY KEY (user_id, friend_id);

--
-- TOC entry 4784 (class 2606 OID 16588)
-- Name: Message Media Message Media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message Media"
    ADD CONSTRAINT "Message Media_pkey" PRIMARY KEY (id);

--
-- TOC entry 4782 (class 2606 OID 16570)
-- Name: Messages Messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (id);

--
-- TOC entry 4774 (class 2606 OID 16518)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);

--
-- TOC entry 4772 (class 2606 OID 16601)
-- Name: Friendships users_in_order; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public."Friendships"
    ADD CONSTRAINT users_in_order CHECK ((user_id > friend_id)) NOT VALID;

--
-- TOC entry 4786 (class 2606 OID 16533)
-- Name: Chat Participants fk_chat_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chat Participants"
    ADD CONSTRAINT fk_chat_id FOREIGN KEY (chat_id) REFERENCES public."Chats"(id) ON DELETE CASCADE;

--
-- TOC entry 4790 (class 2606 OID 16612)
-- Name: Messages fk_chat_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT fk_chat_id FOREIGN KEY (chat_id) REFERENCES public."Chats"(id) ON DELETE CASCADE NOT VALID;

--
-- TOC entry 4788 (class 2606 OID 16557)
-- Name: Friendships fk_friend_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Friendships"
    ADD CONSTRAINT fk_friend_id FOREIGN KEY (friend_id) REFERENCES public."Users"(id);

--
-- TOC entry 4792 (class 2606 OID 16589)
-- Name: Message Media fk_message_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message Media"
    ADD CONSTRAINT fk_message_id FOREIGN KEY (message_id) REFERENCES public."Messages"(id);

--
-- TOC entry 4785 (class 2606 OID 16602)
-- Name: Chats fk_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chats"
    ADD CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES public."Users"(id) NOT VALID;

--
-- TOC entry 4791 (class 2606 OID 16571)
-- Name: Messages fk_sender_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT fk_sender_id FOREIGN KEY (sender_id) REFERENCES public."Users"(id);

--
-- TOC entry 4787 (class 2606 OID 16538)
-- Name: Chat Participants fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Chat Participants"
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON DELETE CASCADE;

--
-- TOC entry 4789 (class 2606 OID 16552)
-- Name: Friendships fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Friendships"
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public."Users"(id);

-- Completed on 2026-03-19 12:56:06

--
-- PostgreSQL database dump complete
--

