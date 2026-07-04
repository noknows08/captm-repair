-- CAPTM Repair gallery backend (Supabase project: ypmwaaeqztxadlfxuebk)
-- Admin uploader: bibisheila08@gmail.com

-- 1. Gallery table
create table if not exists public.captm_gallery (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  caption text,
  created_at timestamptz not null default now()
);

alter table public.captm_gallery enable row level security;

drop policy if exists "captm gallery public read" on public.captm_gallery;
create policy "captm gallery public read"
  on public.captm_gallery for select
  using (true);

drop policy if exists "captm gallery admin insert" on public.captm_gallery;
create policy "captm gallery admin insert"
  on public.captm_gallery for insert to authenticated
  with check ((auth.jwt() ->> 'email') = 'bibisheila08@gmail.com');

drop policy if exists "captm gallery admin delete" on public.captm_gallery;
create policy "captm gallery admin delete"
  on public.captm_gallery for delete to authenticated
  using ((auth.jwt() ->> 'email') = 'bibisheila08@gmail.com');

-- 2. Storage bucket (public read via public object URLs)
insert into storage.buckets (id, name, public)
values ('captm-gallery', 'captm-gallery', true)
on conflict (id) do nothing;

drop policy if exists "captm gallery objects read" on storage.objects;
create policy "captm gallery objects read"
  on storage.objects for select
  using (bucket_id = 'captm-gallery');

drop policy if exists "captm gallery objects insert" on storage.objects;
create policy "captm gallery objects insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'captm-gallery' and (auth.jwt() ->> 'email') = 'bibisheila08@gmail.com');

drop policy if exists "captm gallery objects delete" on storage.objects;
create policy "captm gallery objects delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'captm-gallery' and (auth.jwt() ->> 'email') = 'bibisheila08@gmail.com');
