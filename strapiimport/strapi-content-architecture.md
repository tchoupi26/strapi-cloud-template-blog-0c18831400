# Strapi CMS – Content Architecture (Insurance Brokerage)

> **Scope**  
> Complete reference for Front‑End & API teams: JSON schemas of every Component, Collection‑Type and Lifecycle used to build SEO pages.

---

## 📁 Components

### 1. `seo/meta`
Path: `src/components/seo/meta.json`
```json
{
  "collectionName": "components_seo_metas",
  "info": { "displayName": "metaSEO", "icon": "search" },
  "attributes": {
    "metaTitle":       { "type": "string", "required": true, "maxLength": 60 },
    "metaDescription": { "type": "text",   "maxLength": 160 },
    "canonicalURL":    { "type": "string" },
    "metaRobots": {
      "type": "enumeration",
      "enum": ["index,follow", "noindex,follow", "index,nofollow", "noindex,nofollow"],
      "default": "index,follow"
    },
    "ogTitle":       { "type": "string" },
    "ogDescription": { "type": "text" },
    "ogImage":       { "type": "media", "multiple": false, "allowedTypes": ["images"] },
    "structuredData":{ "type": "json" }
  }
}
```

### 2. `common/cta`
Path: `src/components/common/cta.json`
```json
{
  "collectionName": "components_common_ctas",
  "info": { "displayName": "CTA", "icon": "cursor-pointer" },
  "attributes": {
    "label": { "type": "string", "required": true },
    "url":   { "type": "string", "required": true },
    "style": {
      "type": "enumeration",
      "enum": ["primary", "secondary", "outline"],
      "default": "primary"
    }
  }
}
```

### 3. `content/section-text`
Path: `src/components/content/section-text.json`
```json
{
  "collectionName": "components_content_section_texts",
  "info": { "displayName": "Section Texte", "icon": "align-left" },
  "attributes": {
    "title": { "type": "string" },
    "body":  { "type": "richtext" }
  }
}
```

### 4. `content/image`
Path: `src/components/content/image.json`
```json
{
  "collectionName": "components_content_images",
  "info": { "displayName": "Image", "icon": "image" },
  "attributes": {
    "media":   { "type": "media", "multiple": false, "required": true, "allowedTypes": ["images"] },
    "caption": { "type": "string" }
  }
}
```

### 5. `faq/item`
Path: `src/components/faq/item.json`
```json
{
  "collectionName": "components_faq_items",
  "info": { "displayName": "FAQ Item", "icon": "question-circle" },
  "attributes": {
    "question": { "type": "string",   "required": true },
    "answer":   { "type": "richtext", "required": true }
  }
}
```

### 6. `content/table-row`
Path: `src/components/content/table-row.json`
```json
{
  "collectionName": "components_content_table_rows",
  "info": { "displayName": "Table Row", "icon": "table" },
  "attributes": {
    "provider":    { "type": "string", "required": true },
    "price":       { "type": "decimal" },
    "warranty":    { "type": "string" },
    "advantages":  { "type": "text" },
    "ctaLabel":    { "type": "string" },
    "ctaURL":      { "type": "string" }
  }
}
```

### 7. `content/table-comparatif`
Path: `src/components/content/table-comparatif.json`
```json
{
  "collectionName": "components_content_table_comparatifs",
  "info": { "displayName": "Table Comparatif", "icon": "table" },
  "attributes": {
    "title": { "type": "string" },
    "rows": {
      "type": "component",
      "repeatable": true,
      "component": "content.table-row"
    }
  }
}
```

### 8. `content/calcul-simulation`
Path: `src/components/content/calcul-simulation.json`
```json
{
  "collectionName": "components_content_calcul_simulations",
  "info": { "displayName": "Calcul Simulation", "icon": "calculator" },
  "attributes": {
    "label":   { "type": "string", "required": true },
    "formula": { "type": "string", "required": true },
    "fields":  { "type": "json",   "required": true }
  }
}
```

### 9. `content/testimonial-slider`
Path: `src/components/content/testimonial-slider.json`
```json
{
  "collectionName": "components_content_testimonial_sliders",
  "info": { "displayName": "Testimonial Slider", "icon": "star" },
  "attributes": {
    "title": { "type": "string" },
    "testimonials": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::testimonial.testimonial"
    }
  }
}
```

### 10. `content/anchor-menu`
Path: `src/components/content/anchor-menu.json`
```json
{
  "collectionName": "components_content_anchor_menus",
  "info": { "displayName": "Anchor Menu", "icon": "list" },
  "attributes": {}
}
```

---

## 📚 Collection‑Types

### 1. `type-client`
Path: `src/api/type-client/content-types/type-client.json`
```json
{
  "kind": "collectionType",
  "collectionName": "type_clients",
  "info": {
    "singularName": "type-client",
    "pluralName": "type-clients",
    "displayName": "Type Client"
  },
  "options": { "draftAndPublish": false },
  "attributes": {
    "name": { "type": "string", "required": true, "unique": true },
    "slug": { "type": "uid",    "targetField": "name", "required": true }
  }
}
```

### 2. `categorie-assurance`
Path: `src/api/categorie-assurance/content-types/categorie-assurance.json`
```json
{
  "kind": "collectionType",
  "collectionName": "categorie_assurances",
  "info": {
    "singularName": "categorie-assurance",
    "pluralName":  "categorie-assurances",
    "displayName": "Catégorie Assurance"
  },
  "attributes": {
    "name":        { "type": "string", "required": true },
    "slug":        { "type": "uid",    "targetField": "name", "required": true },
    "description": { "type": "text" },
    "image":       { "type": "media", "multiple": false, "allowedTypes": ["images"] },
    "typeClient":  {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::type-client.type-client"
    }
  }
}
```

### 3. `intention-seo`
Path: `src/api/intention-seo/content-types/intention-seo.json`
```json
{
  "kind": "collectionType",
  "collectionName": "intention_seos",
  "info": {
    "singularName": "intention-seo",
    "pluralName":  "intention-seos",
    "displayName": "Intention SEO"
  },
  "attributes": {
    "label":       { "type": "string", "required": true },
    "slug":        { "type": "uid",    "targetField": "label", "required": true },
    "description": { "type": "text" },
    "order":       { "type": "integer" }
  }
}
```

### 4. `metier`
Path: `src/api/metier/content-types/metier.json`
```json
{
  "kind": "collectionType",
  "collectionName": "metiers",
  "info": {
    "singularName": "metier",
    "pluralName":  "metiers",
    "displayName": "Métier"
  },
  "attributes": {
    "name":        { "type": "string", "required": true },
    "slug":        { "type": "uid",    "targetField": "name", "required": true },
    "description": { "type": "text" },
    "image":       { "type": "media", "multiple": false, "allowedTypes": ["images"] }
  }
}
```

### 5. `testimonial`
Path: `src/api/testimonial/content-types/testimonial.json`
```json
{
  "kind": "collectionType",
  "collectionName": "testimonials",
  "info": {
    "singularName": "testimonial",
    "pluralName":  "testimonials",
    "displayName": "Testimonial"
  },
  "attributes": {
    "clientName": { "type": "string", "required": true },
    "quote":      { "type": "text",   "required": true },
    "rating":     { "type": "integer", "min": 1, "max": 5, "required": true },
    "avatar":     { "type": "media", "multiple": false, "allowedTypes": ["images"] },
    "createdAt":  { "type": "datetime" }
  }
}
```

### 6. `page-seo`
Path: `src/api/page-seo/content-types/page-seo.json`
```json
{
  "kind": "collectionType",
  "collectionName": "page_seos",
  "info": {
    "singularName": "page-seo",
    "pluralName":  "page-seos",
    "displayName": "Page SEO",
    "description": "Pages optimisées pour les intentions de recherche"
  },
  "options": { "draftAndPublish": true },
  "attributes": {
    "title":          { "type": "string", "required": true },
    "slug":           { "type": "uid",    "targetField": "title", "required": true },
    "permalink":      { "type": "string", "unique": true },
    "motClePrincipal":{ "type": "string" },

    "type": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::type-client.type-client"
    },
    "categorie": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::categorie-assurance.categorie-assurance"
    },
    "sousCategorie": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::intention-seo.intention-seo"
    },
    "metiers": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::metier.metier"
    },

    "intro":   { "type": "richtext" },
    "content": {
      "type": "dynamiczone",
      "components": [
        "content.section-text",
        "content.image",
        "content.table-comparatif",
        "content.calcul-simulation",
        "content.testimonial-slider",
        "content.anchor-menu",
        "common.cta",
        "faq.item"
      ]
    },

    "seo": { "type": "component", "component": "seo.meta", "repeatable": false }
  }
}
```

---

## 🔄 Lifecycle – `page-seo`

Path: `src/api/page-seo/content-types/page-seo/lifecycles.js`
```js
'use strict';

/**
 * Construit l'URL canonique SEO d'une page
 */
const buildPermalink = ({ type, categorie, sousCategorie, metiers }) => {
  console.log('🏗️ buildPermalink appelé avec:', { type, categorie, sousCategorie, metiers });
  
  if (!type?.slug || !categorie?.slug || !sousCategorie?.slug) {
    console.log('❌ Slugs manquants:', { 
      typeSlug: type?.slug, 
      categorieSlug: categorie?.slug, 
      sousCategorieSlug: sousCategorie?.slug 
    });
    return null;
  }

  const base = `/${type.slug}/${categorie.slug}`;
  const metierSlug = metiers?.[0]?.slug;
  const permalink = metierSlug ? `${base}/${metierSlug}/${sousCategorie.slug}` : `${base}/${sousCategorie.slug}`;
  
  console.log('🔗 Permalink construit:', permalink);
  return permalink;
};

module.exports = {
  /**
   * À la création : génération du permalink basé sur les relations
   */
  async beforeCreate(event) {
    const { data } = event.params;
    console.log('🔄 beforeCreate appelé avec data:', JSON.stringify(data, null, 2));
    
    // Fonction helper pour extraire le documentId d'une relation
    const extractDocumentId = (relation) => {
      console.log('🔍 extractDocumentId appelé avec:', relation);
      if (!relation) return null;
      
      // Format string direct (documentId)
      if (typeof relation === 'string') return relation;
      
      // Format avec documentId direct
      if (relation.documentId) return relation.documentId;
      
      // Format avec id direct
      if (relation.id) return relation.id;
      
      // Format connect avec documentId
      if (relation.connect && relation.connect.documentId) return relation.connect.documentId;
      
      // Format connect avec id
      if (relation.connect && relation.connect.id) return relation.connect.id;
      
      // Format connect tableau avec documentId ou id
      if (relation.connect && Array.isArray(relation.connect) && relation.connect.length > 0) {
        const firstItem = relation.connect[0];
        if (firstItem.documentId) {
          console.log('🔄 Format connect array détecté, documentId trouvé:', firstItem.documentId);
          return firstItem.documentId;
        }
        if (firstItem.id) {
          console.log('🔄 Format connect array détecté, id trouvé:', firstItem.id);
          return firstItem.id;
        }
      }
      
      // Format Strapi v5 avec set: [{ id: X }] ou set: [{ documentId: X }]
      if (relation.set && Array.isArray(relation.set) && relation.set.length > 0) {
        const firstItem = relation.set[0];
        if (firstItem.documentId) {
          console.log('🔄 Format set détecté, documentId trouvé:', firstItem.documentId);
          return firstItem.documentId;
        }
        if (firstItem.id) {
          console.log('🔄 Format set détecté, id trouvé:', firstItem.id);
          return firstItem.id;
        }
      }
      
      // Format tableau direct
      if (Array.isArray(relation) && relation.length > 0) {
        return extractDocumentId(relation[0]);
      }
      
      console.log('⚠️ Format de relation non reconnu:', relation);
      return null;
    };

    // Helper pour chercher une entité par ID ou documentId
    const findEntityById = async (api, id) => {
      if (!id) return null;
      
      try {
        // Essayer d'abord avec findMany en filtrant par id (pour les IDs numériques)
        const results = await strapi.entityService.findMany(api, {
          filters: { id: id },
          fields: ['slug', 'documentId'],
          limit: 1
        });
        
        if (results && results.length > 0) {
          console.log(`✅ Entité trouvée via ID pour ${api}:`, results[0]);
          return results[0];
        }
        
        // Si pas trouvé avec ID, essayer avec documentId (si c'est une string)
        if (typeof id === 'string' && !id.match(/^\d+$/)) {
          const result = await strapi.documents(api).findOne({
            documentId: id,
            fields: ['slug']
          });
          if (result) {
            console.log(`✅ Entité trouvée via documentId pour ${api}:`, result);
            return result;
          }
        }
        
        console.log(`❌ Entité non trouvée pour ${api} avec id/documentId:`, id);
        return null;
      } catch (error) {
        console.error(`❌ Erreur lors de la recherche de l'entité ${api}:`, error.message);
        return null;
      }
    };

    // Extraction des documentIds des relations
    const typeId = extractDocumentId(data.type);
    const categorieId = extractDocumentId(data.categorie);
    const sousCategorieId = extractDocumentId(data.sousCategorie);
    const metierIds = data.metiers ? (Array.isArray(data.metiers) ? data.metiers.map(extractDocumentId).filter(Boolean) : [extractDocumentId(data.metiers)].filter(Boolean)) : [];

    console.log('📋 IDs extraits:', { typeId, categorieId, sousCategorieId, metierIds });

    // Génération du permalink seulement si toutes les relations nécessaires sont présentes
    if (typeId && categorieId && sousCategorieId) {
      console.log('✅ Toutes les relations nécessaires sont présentes, génération du permalink...');
      try {
        // Récupération des entités liées pour construire le permalink
        console.log('🔍 Récupération des entités liées...');
        
        const [typeEntry, catEntry, sousCatEntry] = await Promise.all([
          findEntityById('api::type-client.type-client', typeId),
          findEntityById('api::categorie-assurance.categorie-assurance', categorieId),
          findEntityById('api::intention-seo.intention-seo', sousCategorieId)
        ]);

        console.log('📄 Entités récupérées:', { typeEntry, catEntry, sousCatEntry });
        
        let metierEntries = [];
        if (metierIds.length > 0) {
          console.log('🔍 Récupération du métier...');
          const metierEntry = await findEntityById('api::metier.metier', metierIds[0]);
          console.log('👷 Métier récupéré:', metierEntry);
          if (metierEntry) {
            metierEntries = [metierEntry];
          }
        }

        if (typeEntry && catEntry && sousCatEntry) {
          console.log('🏗️ Construction du permalink...');
          const permalink = buildPermalink({
            type: typeEntry,
            categorie: catEntry,
            sousCategorie: sousCatEntry,
            metiers: metierEntries
          });

          console.log('🔗 Permalink généré:', permalink);
          if (permalink) {
            data.permalink = permalink;
            console.log('✅ Permalink assigné à data.permalink');
          }
        } else {
          console.log('❌ Une ou plusieurs entités sont manquantes:', { typeEntry: !!typeEntry, catEntry: !!catEntry, sousCatEntry: !!sousCatEntry });
        }
      } catch (error) {
        console.error('❌ Erreur lors de la génération du permalink :', error);
      }
    } else {
      console.log('⚠️ Relations manquantes pour générer le permalink:', { 
        hasType: !!typeId, 
        hasCategorie: !!categorieId, 
        hasSousCategorie: !!sousCategorieId 
      });
    }
  },

  /**
   * À la mise à jour : regénération du permalink si les relations ont changé
   */
  async beforeUpdate(event) {
    const { data, where } = event.params;
    
    // Fonction helper pour extraire le documentId d'une relation
    const extractDocumentId = (relation) => {
      if (!relation) return null;
      
      // Format string direct (documentId)
      if (typeof relation === 'string') return relation;
      
      // Format avec documentId direct
      if (relation.documentId) return relation.documentId;
      
      // Format avec id direct
      if (relation.id) return relation.id;
      
      // Format connect avec documentId
      if (relation.connect && relation.connect.documentId) return relation.connect.documentId;
      
      // Format connect avec id
      if (relation.connect && relation.connect.id) return relation.connect.id;
      
      // Format connect tableau avec documentId ou id
      if (relation.connect && Array.isArray(relation.connect) && relation.connect.length > 0) {
        const firstItem = relation.connect[0];
        if (firstItem.documentId) return firstItem.documentId;
        if (firstItem.id) return firstItem.id;
      }
      
      // Format Strapi v5 avec set
      if (relation.set && Array.isArray(relation.set) && relation.set.length > 0) {
        const firstItem = relation.set[0];
        if (firstItem.documentId) return firstItem.documentId;
        if (firstItem.id) return firstItem.id;
      }
      
      // Format tableau direct
      if (Array.isArray(relation) && relation.length > 0) {
        return extractDocumentId(relation[0]);
      }
      
      return null;
    };

    // Extraction du documentId depuis les paramètres where de Strapi v5
    let documentId = null;
    
    if (where?.documentId) {
      documentId = where.documentId;
    } else if (where?.['$and']?.[0]?.documentId) {
      documentId = where['$and'][0].documentId;
    } else if (typeof where === 'string') {
      documentId = where;
    } else if (where?.id) {
      // Cas où Strapi utilise encore l'ancien format avec 'id'
      try {
        const entities = await strapi.db.query('api::page-seo.page-seo').findMany({
          where: { id: where.id },
          select: ['documentId'],
          limit: 1
        });
        if (entities.length > 0) {
          documentId = entities[0].documentId;
        }
      } catch (error) {
        console.warn('Erreur lors de la conversion id -> documentId:', error.message);
        return;
      }
    } else {
      console.warn('Structure where non reconnue:', JSON.stringify(where, null, 2));
      return;
    }

    if (!documentId) {
      console.warn('Impossible de déterminer le documentId pour la mise à jour');
      return;
    }

    try {
      // Récupération de l'entité existante avec ses relations
      const existingPage = await strapi.documents('api::page-seo.page-seo').findOne({
        documentId: documentId,
        populate: {
          type: { fields: ['slug'] },
          categorie: { fields: ['slug'] },
          sousCategorie: { fields: ['slug'] },
          metiers: { fields: ['slug'] }
        }
      });

      if (!existingPage) {
        console.warn(`Page SEO avec documentId ${documentId} non trouvée`);
        return;
      }

      // Si les relations sont modifiées dans data, récupérer les nouvelles entités
      let typeEntry = existingPage.type;
      let catEntry = existingPage.categorie;
      let sousCatEntry = existingPage.sousCategorie;
      let metierEntries = existingPage.metiers || [];

      // Helper pour chercher une entité par ID ou documentId
      const findEntityById = async (api, id) => {
        if (!id) return null;
        
        try {
          // Essayer d'abord avec findMany en filtrant par id
          const results = await strapi.entityService.findMany(api, {
            filters: { id: id },
            fields: ['slug', 'documentId'],
            limit: 1
          });
          
          if (results && results.length > 0) {
            return results[0];
          }
          
          // Si pas trouvé avec ID, essayer avec documentId
          if (typeof id === 'string' && !id.match(/^\d+$/)) {
            const result = await strapi.documents(api).findOne({
              documentId: id,
              fields: ['slug']
            });
            if (result) {
              return result;
            }
          }
          
          return null;
        } catch (error) {
          console.error(`Erreur lors de la recherche de l'entité ${api}:`, error.message);
          return null;
        }
      };

      // Récupération des nouvelles relations si elles sont mises à jour
      if (data.type !== undefined) {
        const typeId = extractDocumentId(data.type);
        typeEntry = await findEntityById('api::type-client.type-client', typeId);
      }

      if (data.categorie !== undefined) {
        const categorieId = extractDocumentId(data.categorie);
        catEntry = await findEntityById('api::categorie-assurance.categorie-assurance', categorieId);
      }

      if (data.sousCategorie !== undefined) {
        const sousCategorieId = extractDocumentId(data.sousCategorie);
        sousCatEntry = await findEntityById('api::intention-seo.intention-seo', sousCategorieId);
      }

      if (data.metiers !== undefined) {
        metierEntries = [];
        const metierIds = data.metiers ? (Array.isArray(data.metiers) ? data.metiers.map(extractDocumentId).filter(Boolean) : [extractDocumentId(data.metiers)].filter(Boolean)) : [];
        
        if (metierIds.length > 0) {
          const metierEntry = await findEntityById('api::metier.metier', metierIds[0]);
          if (metierEntry) {
            metierEntries = [metierEntry];
          }
        }
      }

      // Génération du nouveau permalink
      if (typeEntry && catEntry && sousCatEntry) {
        const permalink = buildPermalink({
          type: typeEntry,
          categorie: catEntry,
          sousCategorie: sousCatEntry,
          metiers: metierEntries
        });

        if (permalink) {
          data.permalink = permalink;
        }
      }

    } catch (error) {
      console.error('Erreur lors de la mise à jour du permalink :', error);
    }
  }
};
```

---

### 🛠️ Usage Notes for Front‑End (Next.js 15)

* **GraphQL/REST** – query the `permalink` directly for routing.  
* **Dynamic Zone** – render components via a switch (`section-text`, `image`, ...)  
* **JSON‑LD** – inject from `seo.structuredData`.  
* **Draft & Publish** – filter on `publicationState=live` or `publishedAt_not_null`.  

---

© 2025 Inixia – Strapi CMS Blueprint
