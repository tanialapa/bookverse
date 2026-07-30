create table public.user_books (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  open_library_id text not null,
  title text not null,
  authors text[] not null default array[]::text[],
  cover_url text,
  status text not null default 'want_to_read',
  current_page integer not null default 0,
  total_pages integer,
  user_rating smallint,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint user_books_pkey primary key (id),
  constraint user_books_user_id_fkey
    foreign key (user_id) references auth.users (id) on delete cascade,
  constraint user_books_open_library_id_format_check
    check (open_library_id ~ '^OL[0-9]+W$'),
  constraint user_books_title_not_blank_check
    check (btrim(title) <> ''),
  constraint user_books_status_check
    check (status in ('want_to_read', 'reading', 'read')),
  constraint user_books_current_page_nonnegative_check
    check (current_page >= 0),
  constraint user_books_total_pages_positive_check
    check (total_pages is null or total_pages > 0),
  constraint user_books_user_rating_range_check
    check (user_rating is null or user_rating between 1 and 5),
  constraint user_books_current_page_within_total_check
    check (total_pages is null or current_page <= total_pages),
  constraint user_books_user_open_library_unique
    unique (user_id, open_library_id)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_user_books_updated_at on public.user_books;

create trigger set_user_books_updated_at
before update on public.user_books
for each row
execute function public.set_updated_at();

create index user_books_user_id_status_idx
on public.user_books (user_id, status);

alter table public.user_books enable row level security;

drop policy if exists "Users can view their own books" on public.user_books;
create policy "Users can view their own books"
on public.user_books
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can add their own books" on public.user_books;
create policy "Users can add their own books"
on public.user_books
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own books" on public.user_books;
create policy "Users can update their own books"
on public.user_books
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own books" on public.user_books;
create policy "Users can delete their own books"
on public.user_books
for delete
to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.user_books from anon;
grant select, insert, update, delete on table public.user_books to authenticated;
