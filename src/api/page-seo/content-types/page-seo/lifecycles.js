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

module.exports = {  /**
   * À la création : génération du permalink basé sur les relations
   */
  async beforeCreate(event) {
    const { data } = event.params;
    console.log('🔄 beforeCreate appelé avec data:', JSON.stringify(data, null, 2));    // Fonction helper pour extraire le documentId d'une relation
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

    // Extraction des documentIds des relations
    const typeId = extractDocumentId(data.type);
    const categorieId = extractDocumentId(data.categorie);
    const sousCategorieId = extractDocumentId(data.sousCategorie);
    const metierIds = data.metiers ? (Array.isArray(data.metiers) ? data.metiers.map(extractDocumentId).filter(Boolean) : [extractDocumentId(data.metiers)].filter(Boolean)) : [];

    console.log('📋 IDs extraits:', { typeId, categorieId, sousCategorieId, metierIds });    // Génération du permalink seulement si toutes les relations nécessaires sont présentes
    if (typeId && categorieId && sousCategorieId) {
      console.log('✅ Toutes les relations nécessaires sont présentes, génération du permalink...');
      try {        // Récupération des entités liées pour construire le permalink
        console.log('🔍 Récupération des entités liées...');
        
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
        
        const [typeEntry, catEntry, sousCatEntry] = await Promise.all([
          findEntityById('api::type-client.type-client', typeId),
          findEntityById('api::categorie-assurance.categorie-assurance', categorieId),
          findEntityById('api::intention-seo.intention-seo', sousCategorieId)
        ]);

        console.log('📄 Entités récupérées:', { typeEntry, catEntry, sousCatEntry });        let metierEntries = [];
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
        }      } catch (error) {
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
      // Essayer de convertir l'id en documentId en récupérant l'entité
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
      // Pour debug, afficher la structure complète de where (mais sans spam)
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
      let metierEntries = existingPage.metiers || [];      // Helper pour chercher une entité par ID ou documentId
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
      }      if (data.metiers !== undefined) {
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
