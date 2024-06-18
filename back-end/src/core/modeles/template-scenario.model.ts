export type ProductItem = {
    product_retailer_id: string;
  };
  
  export type Section = {
    title: string;
    product_items: ProductItem[];
  };
  
  // Définition du type TypeScript pour le modèle de TemplateScenarios
  export type TemplateScenariosModel = {
    thumbnail_id: string;
    sections: Section[];
  };
  
  // Interface Mongoose pour le modèle de TemplateScenarios
  export interface TemplateScenariosDoc extends Document, TemplateScenariosModel {
    createdAt: Date;
    updatedAt: Date;
  }