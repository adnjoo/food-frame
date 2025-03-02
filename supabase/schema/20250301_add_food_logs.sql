-- Create a fresh table with full nutrition tracking
create table food_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  food_name text not null,
  calories integer not null,
  protein integer not null default 0,  -- Macronutrients
  carbs integer not null default 0,
  fat integer not null default 0,
  image_url text, -- Optional: Store image reference if needed
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table food_logs enable row level security;

-- Policy: Users can view only their own food logs
create policy "Users can view their own logs."
on food_logs for select
using (auth.uid() = user_id);

-- Policy: Users can insert their own food logs
create policy "Users can insert their own food logs."
on food_logs for insert
with check (auth.uid() = user_id);

-- Policy: Users can update only their own food logs
create policy "Users can update their own food logs."
on food_logs for update
using (auth.uid() = user_id);

-- Policy: Users can delete only their own food logs
create policy "Users can delete their own food logs."
on food_logs for delete
using (auth.uid() = user_id);
