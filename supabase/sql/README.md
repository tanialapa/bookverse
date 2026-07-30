# BookVerse database SQL

`create_user_books.sql` creates the personal library table, its constraints,
updated-at trigger, index, Row Level Security policies, and role permissions.

`verify_user_books.sql` contains read-only queries for checking the table,
columns, constraints, policies, indexes, RLS setting, and updated-at trigger.

Run these files manually in **Supabase Dashboard -> SQL Editor -> New query**:

1. Run `create_user_books.sql` first.
2. Run `verify_user_books.sql` after creation and review every result.

Never paste a secret key into the SQL Editor. Do not rerun the creation file
after real data exists without reviewing its statements and the current database
state. These files can later be moved into a full migration system.
