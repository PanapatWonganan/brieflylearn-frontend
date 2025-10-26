-- Enable the necessary extensions
create extension if not exists "uuid-ossp";

-- Create custom types
create type user_role as enum ('student', 'instructor', 'admin');
create type course_level as enum ('beginner', 'intermediate', 'advanced', 'expert');
create type payment_status as enum ('pending', 'completed', 'failed', 'refunded');

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role user_role default 'student',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Courses table
create table public.courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  instructor_id uuid references public.profiles(id) not null,
  category text not null,
  level course_level not null,
  duration_weeks integer not null,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  thumbnail_url text,
  video_url text,
  is_published boolean default false,
  rating numeric(3,2),
  total_students integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Lessons table
create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text,
  duration_minutes integer not null,
  order_index integer not null,
  is_free boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enrollments table
create table public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  course_id uuid references public.courses(id) not null,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  progress_percentage integer default 0,
  payment_status payment_status default 'pending',
  payment_amount numeric(10,2) not null,
  unique(user_id, course_id)
);

-- Lesson progress table
create table public.lesson_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  completed_at timestamp with time zone,
  watch_time_minutes integer default 0,
  is_completed boolean default false,
  unique(user_id, lesson_id)
);

-- Reviews table
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_id)
);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.reviews enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Courses policies
create policy "Published courses are viewable by everyone" on public.courses
  for select using (is_published = true or auth.uid() = instructor_id);

create policy "Instructors can manage their own courses" on public.courses
  for all using (auth.uid() = instructor_id);

-- Lessons policies
create policy "Lessons are viewable for enrolled users or course owners" on public.lessons
  for select using (
    exists (
      select 1 from public.courses 
      where courses.id = lessons.course_id 
      and (courses.is_published = true or courses.instructor_id = auth.uid())
    )
  );

-- Enrollments policies
create policy "Users can view their own enrollments" on public.enrollments
  for select using (auth.uid() = user_id);

create policy "Users can create their own enrollments" on public.enrollments
  for insert with check (auth.uid() = user_id);

-- Lesson progress policies
create policy "Users can view and manage their own lesson progress" on public.lesson_progress
  for all using (auth.uid() = user_id);

-- Reviews policies
create policy "Reviews are viewable by everyone" on public.reviews
  for select using (true);

create policy "Users can manage their own reviews" on public.reviews
  for all using (auth.uid() = user_id);

-- Functions for updating timestamps
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Triggers for updated_at
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger handle_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.courses
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.lessons
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.reviews
  for each row execute procedure public.handle_updated_at();

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

-- Insert sample data
insert into public.profiles (id, email, full_name, role) values
  ('00000000-0000-0000-0000-000000000001', 'instructor1@fitlearn.com', 'อาจารย์นิดา สุขสันต์', 'instructor'),
  ('00000000-0000-0000-0000-000000000002', 'instructor2@fitlearn.com', 'โค้ชมาร์ค ฟิตเนส', 'instructor'),
  ('00000000-0000-0000-0000-000000000003', 'instructor3@fitlearn.com', 'โค้ชจิม พาวเวอร์', 'instructor');

insert into public.courses (
  title, description, instructor_id, category, level, duration_weeks, price, original_price, is_published, rating, total_students
) values
  (
    'โยคะเบื้องต้นสำหรับมือใหม่',
    'เรียนรู้ท่าโยคะพื้นฐานที่จะช่วยเพิ่มความยืดหยุ่นและความแข็งแรงของร่างกาย พร้อมเทคนิคการหายใจที่ถูกต้อง',
    '00000000-0000-0000-0000-000000000001',
    'โยคะ',
    'beginner',
    4,
    1990,
    2990,
    true,
    4.8,
    1250
  ),
  (
    'เทรนนิ่งลดน้ำหนักแบบ HIIT',
    'โปรแกรมเทรนนิ่งแบบ HIIT ที่จะช่วยเผาผลาญไขมันอย่างมีประสิทธิภาพ ใน 30 นาทีต่อวัน',
    '00000000-0000-0000-0000-000000000002',
    'การ์ดิโอ',
    'intermediate',
    6,
    2490,
    3490,
    true,
    4.9,
    890
  ),
  (
    'เสริมสร้างกล้ามเนื้อที่บ้าน',
    'สร้างกล้ามเนื้อและความแข็งแรงด้วยการออกกำลังกายที่บ้านโดยไม่ต้องใช้อุปกรณ์ เพียงใช้น้ำหนักตัว',
    '00000000-0000-0000-0000-000000000003',
    'กล้ามเนื้อ',
    'intermediate',
    8,
    2990,
    4490,
    true,
    4.7,
    675
  ); 