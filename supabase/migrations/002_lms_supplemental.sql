-- LMS supplemental tables: wishlist, preferences, coupons, orders, activity logs

create table if not exists sales.wishlist (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references identity.profiles(id) on delete cascade not null,
    course_id uuid references catalog.courses(id) on delete cascade not null,
    added_at timestamptz default now(),
    constraint wishlist_unique unique (user_id, course_id)
);

create table if not exists identity.preferences (
    user_id uuid references identity.profiles(id) on delete cascade primary key,
    data jsonb not null default '{}'::jsonb,
    updated_at timestamptz default now()
);

create table if not exists sales.coupons (
    id uuid primary key default gen_random_uuid(),
    code text unique not null,
    name text,
    description text,
    discount_percent numeric default 0,
    discount_amount numeric,
    usage_limit integer default 0,
    usage_count integer default 0,
    valid_from timestamptz,
    valid_until timestamptz,
    is_active boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists sales.orders (
    id uuid primary key default gen_random_uuid(),
    order_number text unique not null,
    user_id uuid references identity.profiles(id) not null,
    subtotal_amount numeric default 0,
    tax_amount numeric default 0,
    discount_amount numeric default 0,
    total_amount numeric not null,
    status text check (status in ('pending','confirmed','completed','cancelled','refunded')) default 'pending',
    currency text default 'USD',
    payment_method text,
    payment_transaction_id text,
    payment_completed_at timestamptz,
    notes text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists sales.order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid references sales.orders(id) on delete cascade not null,
    course_id uuid references catalog.courses(id) not null,
    title text not null,
    slug text,
    unit_price numeric default 0,
    quantity integer default 1,
    total_amount numeric default 0,
    status text check (status in ('active','cancelled','refunded')) default 'active',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists identity.activity_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references identity.profiles(id) on delete cascade,
    activity_type text not null,
    resource_id text,
    resource_type text,
    metadata jsonb default '{}'::jsonb,
    duration_minutes integer default 0,
    created_at timestamptz default now()
);

alter table sales.wishlist enable row level security;
alter table identity.preferences enable row level security;
alter table sales.coupons enable row level security;
alter table sales.orders enable row level security;
alter table sales.order_items enable row level security;
alter table identity.activity_logs enable row level security;

grant select, insert, update, delete on sales.wishlist to authenticated;
grant select on sales.wishlist to anon;
grant select, insert, update on identity.preferences to authenticated;
grant select on sales.coupons to anon, authenticated;
grant select, insert, update, delete on sales.coupons to service_role;
grant select, insert, update on sales.orders to authenticated;
grant select, insert on sales.order_items to authenticated;
grant select, insert on identity.activity_logs to authenticated;

create index idx_wishlist_user on sales.wishlist(user_id);
create index idx_orders_user on sales.orders(user_id);
create index idx_order_items_order on sales.order_items(order_id);
create index idx_coupons_code on sales.coupons(code);
create index idx_activity_user on identity.activity_logs(user_id);

create policy "wishlist_own" on sales.wishlist for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "wishlist_public_read" on sales.wishlist for select to anon using (false);
create policy "preferences_own" on identity.preferences for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "coupons_public_read" on sales.coupons for select to anon, authenticated using (is_active = true);
create policy "orders_own" on sales.orders for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "order_items_own" on sales.order_items for all to authenticated using (exists (select 1 from sales.orders o where o.id = order_id and o.user_id = auth.uid())) with check (exists (select 1 from sales.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "activity_own" on identity.activity_logs for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
