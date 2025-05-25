import type { Schema, Struct } from '@strapi/strapi';

export interface CommonCta extends Struct.ComponentSchema {
  collectionName: 'components_common_ctas';
  info: {
    displayName: 'CTA';
    icon: 'cursor-pointer';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    style: Schema.Attribute.Enumeration<['primary', 'secondary', 'outline']> &
      Schema.Attribute.DefaultTo<'primary'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentAnchorMenu extends Struct.ComponentSchema {
  collectionName: 'components_content_anchor_menus';
  info: {
    displayName: 'Anchor Menu';
    icon: 'list';
  };
  attributes: {};
}

export interface ContentCalculSimulation extends Struct.ComponentSchema {
  collectionName: 'components_content_calcul_simulations';
  info: {
    displayName: 'Calcul Simulation';
    icon: 'calculator';
  };
  attributes: {
    fields: Schema.Attribute.JSON & Schema.Attribute.Required;
    formula: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentImage extends Struct.ComponentSchema {
  collectionName: 'components_content_images';
  info: {
    displayName: 'Image';
    icon: 'image';
  };
  attributes: {
    caption: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ContentSectionText extends Struct.ComponentSchema {
  collectionName: 'components_content_section_texts';
  info: {
    displayName: 'Section Texte';
    icon: 'align-left';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface ContentTableComparatif extends Struct.ComponentSchema {
  collectionName: 'components_content_table_comparatifs';
  info: {
    displayName: 'Table Comparatif';
    icon: 'table';
  };
  attributes: {
    rows: Schema.Attribute.Component<'content.table-row', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContentTableRow extends Struct.ComponentSchema {
  collectionName: 'components_content_table_rows';
  info: {
    displayName: 'Table Row';
    icon: 'table';
  };
  attributes: {
    advantages: Schema.Attribute.Text;
    ctaLabel: Schema.Attribute.String;
    ctaURL: Schema.Attribute.String;
    price: Schema.Attribute.Decimal;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    warranty: Schema.Attribute.String;
  };
}

export interface ContentTestimonialSlider extends Struct.ComponentSchema {
  collectionName: 'components_content_testimonial_sliders';
  info: {
    displayName: 'Testimonial Slider';
    icon: 'star';
  };
  attributes: {
    testimonials: Schema.Attribute.Relation<
      'manyToMany',
      'api::testimonial.testimonial'
    >;
    title: Schema.Attribute.String;
  };
}

export interface FaqItem extends Struct.ComponentSchema {
  collectionName: 'components_faq_items';
  info: {
    displayName: 'FAQ Item';
    icon: 'question-circle';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_seo_metas';
  info: {
    displayName: 'metaSEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaRobots: Schema.Attribute.Enumeration<
      ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow']
    > &
      Schema.Attribute.DefaultTo<'index,follow'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedAnchor extends Struct.ComponentSchema {
  collectionName: 'components_shared_anchors';
  info: {
    displayName: 'Ancre';
    icon: 'anchor';
  };
  attributes: {
    anchor: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.cta': CommonCta;
      'content.anchor-menu': ContentAnchorMenu;
      'content.calcul-simulation': ContentCalculSimulation;
      'content.image': ContentImage;
      'content.section-text': ContentSectionText;
      'content.table-comparatif': ContentTableComparatif;
      'content.table-row': ContentTableRow;
      'content.testimonial-slider': ContentTestimonialSlider;
      'faq.item': FaqItem;
      'seo.meta': SeoMeta;
      'shared.anchor': SharedAnchor;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
