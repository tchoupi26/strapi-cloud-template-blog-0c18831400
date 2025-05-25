/**
 * uploadStrapi.js
 * Usage: STRAPI_URL=http://localhost:1337 STRAPI_TOKEN=yourToken node uploadStrapi.js
 */

const fs = require('fs');
const path = require('path');
// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { parse } = require('csv-parse/sync');
const axios = require('axios');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const TOKEN = process.env.STRAPI_TOKEN;
if (!TOKEN) {
  console.error('Please set STRAPI_TOKEN env variable (API token with create permissions).');
  process.exit(1);
}

const client = axios.create({
  baseURL: STRAPI_URL + '/api',
  headers: { Authorization: `Bearer ${TOKEN}` }
});

async function createEntry(collection, data) {
  try {
    const res = await client.post(`/${collection}`, { data });
    return res.data.data.id;
  } catch (e) {
    console.error(`Error creating ${collection}`, e.response?.data || e.message);
    process.exit(1);
  }
}

function loadCsv(filename) {
  const content = fs.readFileSync(path.join(__dirname, filename));
  return parse(content, { columns: true, skip_empty_lines: true });
}

(async () => {
  // Maps slug -> id
  const typeMap = {};
  for (const row of loadCsv('type_clients.csv')) {
    const id = await createEntry('type-clients', { name: row.name, slug: row.slug });
    typeMap[row.slug] = id;
  }

  const catMap = {};
  for (const row of loadCsv('categorie_assurances.csv')) {
    const id = await createEntry('categorie-assurances', {
      name: row.name,
      slug: row.slug,
      description: row.description,
      typeClient: typeMap[row.typeClient_slug]
    });
    catMap[row.slug] = id;
  }

  const intentMap = {};
  for (const row of loadCsv('intention_seos.csv')) {
    const id = await createEntry('intention-seos', {
      label: row.label,
      slug: row.slug,
      description: row.description,
      order: +row.order
    });
    intentMap[row.slug] = id;
  }

  const metierMap = {};
  for (const row of loadCsv('metiers.csv')) {
    const id = await createEntry('metiers', {
      name: row.name,
      slug: row.slug,
      description: row.description
    });
    metierMap[row.slug] = id;
  }

  for (const row of loadCsv('testimonials.csv')) {
    await createEntry('testimonials', {
      clientName: row.clientName,
      quote: row.quote,
      rating: +row.rating
    });
  }

  // Pages SEO
  for (const row of loadCsv('page_seos.csv')) {
    const metierIds = row.metiers_slugs
      ? row.metiers_slugs.split('|').map(s => metierMap[s]).filter(Boolean)
      : [];
    const seo = {
      metaTitle: row.seo_metaTitle,
      metaDescription: row.seo_metaDescription
    };
    const data = {
      title: row.title,
      slug: row.slug,
      motClePrincipal: row.motClePrincipal,
      type: typeMap[row.type_slug],
      categorie: catMap[row.categorie_slug],
      sousCategorie: intentMap[row.sousCategorie_slug],
      metiers: metierIds,
      intro: row.intro,
      seo,
      // content field expects JSON array
      content: JSON.parse(row.content_json),
      publishedAt: new Date().toISOString()
    };
    await createEntry('page-seos', data);
  }

  console.log('✅ Import completed!');
})();
