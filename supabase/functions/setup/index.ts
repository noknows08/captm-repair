// One-shot setup runner for the CAPTM gallery backend.
// Deployed, invoked once, then deleted — see supabase/backend.sql for the same DDL.
import postgres from "https://esm.sh/postgres@3.4.4";

const DDL = `
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
`;

Deno.serve(async (_req) => {
  const dbUrl = Deno.env.get("SUPABASE_DB_URL");
  if (!dbUrl) {
    return new Response(JSON.stringify({ ok: false, error: "SUPABASE_DB_URL not available" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
  const sql = postgres(dbUrl, { prepare: false });
  try {
    await sql.unsafe(DDL);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  } finally {
    await sql.end();
  }
});
