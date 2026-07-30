select
  to_regclass('public.user_books') is not null as table_exists;

select
  namespace.nspname as table_schema,
  relation.relname as table_name,
  relation.relrowsecurity as row_level_security_enabled
from pg_catalog.pg_class as relation
join pg_catalog.pg_namespace as namespace
  on namespace.oid = relation.relnamespace
where namespace.nspname = 'public'
  and relation.relname = 'user_books';

select
  column_name,
  data_type,
  udt_name,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'user_books'
order by ordinal_position;

select
  constraint_record.conname as constraint_name,
  constraint_record.contype as constraint_type,
  pg_catalog.pg_get_constraintdef(constraint_record.oid) as definition
from pg_catalog.pg_constraint as constraint_record
where constraint_record.conrelid = 'public.user_books'::regclass
order by constraint_record.conname;

select
  policyname as policy_name,
  cmd as command,
  roles,
  qual as using_expression,
  with_check as with_check_expression
from pg_catalog.pg_policies
where schemaname = 'public'
  and tablename = 'user_books'
order by policyname;

select
  indexname as index_name,
  indexdef as definition
from pg_catalog.pg_indexes
where schemaname = 'public'
  and tablename = 'user_books'
order by indexname;

select
  trigger_name,
  event_manipulation,
  action_timing,
  action_statement
from information_schema.triggers
where event_object_schema = 'public'
  and event_object_table = 'user_books'
  and trigger_name = 'set_user_books_updated_at';
