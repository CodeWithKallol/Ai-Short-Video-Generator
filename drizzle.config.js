/** @type { import("drizzle-kit").Config } */

export default({
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_f9CxKO3oelVT@ep-wandering-boat-adjxd2s7-pooler.c-2.us-east-1.aws.neon.tech/ai-short-video-generator?sslmode=require&channel_binding=require'
  },
});
