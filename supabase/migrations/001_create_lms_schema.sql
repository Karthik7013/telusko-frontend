-- LMS Schema Migration
-- Supabase Project: demo

-- Create schemas
create schema if not exists identity;
create schema if not exists catalog;
create schema if not exists sales;

-- ==================== IDENTITY ====================

create table if not exists identity.profiles (
    id uuid references auth.users(id) primary key,
    display_name text,
    avatar_url text,
    created_at timestamptz default now()
);

create table if not exists identity.roles (
    id uuid primary key default gen_random_uuid(),
    name text unique not null,
    description text
);

create table if not exists identity.user_roles (
    user_id uuid references identity.profiles(id) on delete cascade,
    role_id uuid references identity.roles(id) on delete cascade,
    status text check (status in ('active','pending','rejected')) default 'pending',
    created_at timestamptz default now(),
    primary key (user_id, role_id)
);

-- ==================== CATALOG ====================

create table if not exists catalog.categories (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text unique not null
);

create table if not exists catalog.courses (
    id uuid primary key default gen_random_uuid(),
    instructor_id uuid references identity.profiles(id) not null,
    category_id uuid references catalog.categories(id),
    title text not null,
    slug text unique not null,
    description text,
    price numeric default 0,
    status text check (status in ('draft','pending_review','published','rejected','archived')) default 'draft',
    created_at timestamptz default now()
);

create table if not exists catalog.sections (
    id uuid primary key default gen_random_uuid(),
    course_id uuid references catalog.courses(id) on delete cascade not null,
    title text not null,
    order_index integer not null default 0,
    constraint sections_course_order unique (course_id, order_index)
);

create table if not exists catalog.lectures (
    id uuid primary key default gen_random_uuid(),
    section_id uuid references catalog.sections(id) on delete cascade not null,
    title text not null,
    content_type text check (content_type in ('video','article','quiz','pdf')) default 'video',
    content_url text,
    duration_seconds integer default 0,
    is_preview boolean default false,
    order_index integer not null default 0,
    constraint lectures_section_order unique (section_id, order_index)
);

-- ==================== SALES ====================

create table if not exists sales.enrollments (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references identity.profiles(id) not null,
    course_id uuid references catalog.courses(id) not null,
    status text check (status in ('enrolled','in_progress','completed')) default 'enrolled',
    enrolled_at timestamptz default now(),
    last_accessed_at timestamptz default now(),
    constraint enrollments_unique unique (user_id, course_id)
);

create table if not exists sales.transactions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references identity.profiles(id) not null,
    course_id uuid references catalog.courses(id) not null,
    amount numeric not null,
    payment_status text check (payment_status in ('pending','completed','failed')) default 'pending',
    gateway_txn_id text,
    created_at timestamptz default now()
);

create table if not exists sales.course_approvals (
    id uuid primary key default gen_random_uuid(),
    course_id uuid references catalog.courses(id) unique,
    approved_by uuid references identity.profiles(id),
    is_active boolean default false,
    version_meta jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ==================== RLS ====================

alter table identity.profiles enable row level security;
alter table identity.roles enable row level security;
alter table identity.user_roles enable row level security;
alter table catalog.categories enable row level security;
alter table catalog.courses enable row level security;
alter table catalog.sections enable row level security;
alter table catalog.lectures enable row level security;
alter table sales.enrollments enable row level security;
alter table sales.transactions enable row level security;
alter table sales.course_approvals enable row level security;

-- Grants
grant usage on schema identity to anon, authenticated, service_role;
grant usage on schema catalog to anon, authenticated, service_role;
grant usage on schema sales to anon, authenticated, service_role;

grant select on identity.profiles to anon, authenticated;
grant insert on identity.profiles to authenticated;
grant update on identity.profiles to authenticated;
grant delete on identity.profiles to service_role;

grant select on identity.roles to anon, authenticated, service_role;
grant insert on identity.roles to service_role;
grant update on identity.roles to service_role;
grant delete on identity.roles to service_role;

grant select on identity.user_roles to anon, authenticated;
grant insert on identity.user_roles to authenticated;
grant update on identity.user_roles to authenticated;
grant delete on identity.user_roles to service_role;

grant select on catalog.categories to anon, authenticated, service_role;
grant insert on catalog.categories to service_role;
grant update on catalog.categories to service_role;
grant delete on catalog.categories to service_role;

grant select on catalog.courses to anon, authenticated, service_role;
grant insert on catalog.courses to authenticated;
grant update on catalog.courses to authenticated;
grant delete on catalog.courses to service_role;

grant select on catalog.sections to anon, authenticated, service_role;
grant insert on catalog.sections to authenticated;
grant update on catalog.sections to authenticated;
grant delete on catalog.sections to service_role;

grant select on catalog.lectures to anon, authenticated, service_role;
grant insert on catalog.lectures to authenticated;
grant update on catalog.lectures to authenticated;
grant delete on catalog.lectures to service_role;

grant select on sales.enrollments to anon, authenticated;
grant insert on sales.enrollments to authenticated;
grant update on sales.enrollments to authenticated;
grant delete on sales.enrollments to service_role;

grant select on sales.transactions to anon, authenticated;
grant insert on sales.transactions to authenticated;
grant update on sales.transactions to authenticated;
grant delete on sales.transactions to service_role;

grant select on sales.course_approvals to anon, authenticated, service_role;
grant insert on sales.course_approvals to service_role;
grant update on sales.course_approvals to service_role;
grant delete on sales.course_approvals to service_role;

-- ==================== INDEXES ====================

create index idx_courses_instructor on catalog.courses(instructor_id);
create index idx_courses_status on catalog.courses(status);
create index idx_courses_category on catalog.courses(category_id);
create index idx_sections_course on catalog.sections(course_id);
create index idx_lectures_section on catalog.lectures(section_id);
create index idx_enrollments_user_course on sales.enrollments(user_id, course_id);
create index idx_transactions_user on sales.transactions(user_id);
create index idx_transactions_course on sales.transactions(course_id);
create index idx_course_approvals_course on sales.course_approvals(course_id);
create index idx_user_roles_lookup on identity.user_roles(user_id, role_id, status);

-- ==================== SEED DATA ====================

-- Roles
insert into identity.roles (id, name, description) values
    (gen_random_uuid(), 'student', 'Default learner role'),
    (gen_random_uuid(), 'instructor', 'Course creator role'),
    (gen_random_uuid(), 'admin', 'System administrator role')
on conflict (name) do nothing;

-- Categories
insert into catalog.categories (id, name, slug) values
    (gen_random_uuid(), 'Programming', 'programming'),
    (gen_random_uuid(), 'Web Development', 'web-development'),
    (gen_random_uuid(), 'Data Science', 'data-science'),
    (gen_random_uuid(), 'DevOps', 'devops'),
    (gen_random_uuid(), 'Mobile Development', 'mobile-development')
on conflict (slug) do nothing;

-- RLS Policies

-- profiles: own/admin read, own update
create policy "profiles_select_own" on identity.profiles for select
    using (auth.uid() = id or exists (select 1 from identity.user_roles where user_id = auth.uid() and role_id = (select id from identity.roles where name = 'admin') and status = 'active'));

create policy "profiles_update_own" on identity.profiles for update
    using (auth.uid() = id);

-- user_roles: own/admin read, own insert/update
-- NOTE: admin check uses identity.is_admin() (SECURITY DEFINER) to avoid
-- infinite recursion from a policy on user_roles querying user_roles.
create or replace function identity.is_admin()
returns boolean
language sql
security definer
set search_path = identity, auth, public
stable as $$
  select exists (
    select 1 from identity.user_roles ur
    join identity.roles r on r.id = ur.role_id
    where ur.user_id = auth.uid() and r.name = 'admin' and ur.status = 'active'
  );
$$;

create policy "user_roles_select_own" on identity.user_roles for select
    using (auth.uid() = user_id or identity.is_admin());

create policy "user_roles_insert_own" on identity.user_roles for insert
    with check (auth.uid() = user_id);

create policy "user_roles_update_own" on identity.user_roles for update
    using (auth.uid() = user_id);

-- categories: all read
create policy "categories_select_all" on catalog.categories for select
    to anon, authenticated using (true);

-- courses: published+active, enrolled, instructor own (separate policies)
create policy "courses_select_published" on catalog.courses for select
    to anon, authenticated using (
        status = 'published'
        and exists (select 1 from sales.course_approvals ca where ca.course_id = catalog.courses.id and ca.is_active = true)
    );

create policy "courses_select_enrolled" on catalog.courses for select
    to authenticated using (
        exists (select 1 from sales.enrollments e where e.course_id = catalog.courses.id and e.user_id = auth.uid())
    );

create policy "courses_select_instructor_own" on catalog.courses for select
    to authenticated using (instructor_id = auth.uid());

create policy "courses_insert_instructor" on catalog.courses for insert
    to authenticated with check (instructor_id = auth.uid());

create policy "courses_update_instructor_own" on catalog.courses for update
    to authenticated using (instructor_id = auth.uid());

create policy "courses_delete_instructor_draft" on catalog.courses for delete
    to authenticated using (instructor_id = auth.uid() and status = 'draft');

-- sections: read parent visible or enrolled, instructor own
create policy "sections_select_visible" on catalog.sections for select
    to anon, authenticated using (
        exists (select 1 from catalog.courses c join sales.course_approvals ca on c.id = ca.course_id where c.id = sections.course_id and ca.is_active = true)
        or exists (select 1 from sales.enrollments e where e.course_id = sections.course_id and e.user_id = auth.uid())
        or exists (select 1 from catalog.courses c where c.id = sections.course_id and c.instructor_id = auth.uid())
    );

create policy "sections_insert_instructor" on catalog.sections for insert
    to authenticated with check (exists (select 1 from catalog.courses where id = course_id and instructor_id = auth.uid()));

create policy "sections_update_instructor_own" on catalog.sections for update
    to authenticated using (exists (select 1 from catalog.courses where id = course_id and instructor_id = auth.uid()));

create policy "sections_delete_instructor_draft" on catalog.sections for delete
    to authenticated using (exists (select 1 from catalog.courses where id = course_id and instructor_id = auth.uid() and status in ('draft','rejected')));

-- lectures: read parent visible or enrolled, instructor own
create policy "lectures_select_visible" on catalog.lectures for select
    to anon, authenticated using (
        exists (select 1 from catalog.sections s join catalog.courses c on s.course_id = c.id join sales.course_approvals ca on c.id = ca.course_id where s.id = lectures.section_id and ca.is_active = true)
        or exists (select 1 from catalog.sections s join sales.enrollments e on s.course_id = e.course_id where s.id = lectures.section_id and e.user_id = auth.uid())
        or exists (select 1 from catalog.sections s join catalog.courses c on s.course_id = c.id where s.id = lectures.section_id and c.instructor_id = auth.uid())
    );

create policy "lectures_insert_instructor" on catalog.lectures for insert
    to authenticated with check (exists (select 1 from catalog.sections s join catalog.courses c on s.course_id = c.id where s.id = section_id and c.instructor_id = auth.uid()));

create policy "lectures_update_instructor_own" on catalog.lectures for update
    to authenticated using (exists (select 1 from catalog.sections s join catalog.courses c on s.course_id = c.id where s.id = section_id and c.instructor_id = auth.uid()));

create policy "lectures_delete_instructor_draft" on catalog.lectures for delete
    to authenticated using (exists (select 1 from catalog.sections s join catalog.courses c on s.course_id = c.id where s.id = section_id and c.instructor_id = auth.uid() and c.status in ('draft','rejected')));

-- enrollments: student own
create policy "enrollments_select_own" on sales.enrollments for select
    using (auth.uid() = user_id);

create policy "enrollments_insert_own" on sales.enrollments for insert
    with check (auth.uid() = user_id);

create policy "enrollments_update_own" on sales.enrollments for update
    using (auth.uid() = user_id);

-- transactions: student/own read, insert via enrollment
create policy "transactions_select_own" on sales.transactions for select
    using (auth.uid() = user_id);

create policy "transactions_insert_own" on sales.transactions for insert
    with check (auth.uid() = user_id);

create policy "transactions_update_own" on sales.transactions for update
    using (auth.uid() = user_id);

-- course_approvals: admin full, others read-only for gating
create policy "course_approvals_select_all" on sales.course_approvals for select
    to anon, authenticated using (true);

create policy "course_approvals_insert_admin" on sales.course_approvals for insert
    to authenticated with check (exists (select 1 from identity.user_roles ur join identity.roles r on ur.role_id = r.id where ur.user_id = auth.uid() and r.name = 'admin' and ur.status = 'active'));

create policy "course_approvals_update_admin" on sales.course_approvals for update
    to authenticated using (exists (select 1 from identity.user_roles ur join identity.roles r on ur.role_id = r.id where ur.user_id = auth.uid() and r.name = 'admin' and ur.status = 'active'));

create policy "course_approvals_delete_admin" on sales.course_approvals for delete
    to authenticated using (exists (select 1 from identity.user_roles ur join identity.roles r on ur.role_id = r.id where ur.user_id = auth.uid() and r.name = 'admin' and ur.status = 'active'));

-- Trigger to auto-create profile and assign student role on signup
create or replace function handle_new_user()
returns trigger as $$
declare
    student_role_id uuid;
begin
    insert into identity.profiles (id, display_name, avatar_url)
    values (new.id, new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'avatar_url');

    select id into student_role_id from identity.roles where name = 'student';
    if student_role_id is not null then
        insert into identity.user_roles (user_id, role_id, status)
        values (new.id, student_role_id, 'active')
        on conflict (user_id, role_id) do nothing;
    end if;
    return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
    after insert on auth.users
    for each row execute function handle_new_user();