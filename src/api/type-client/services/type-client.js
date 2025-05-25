'use strict';

/**
 * type-client service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::type-client.type-client');
