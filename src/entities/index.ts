/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType image */
  secondaryImage?: string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  serviceDescription?: string;
  /** @wixFieldType text */
  serviceCategory?: string;
  /** @wixFieldType image */
  serviceImage?: string;
  /** @wixFieldType text */
  technicalDetails?: string;
  /** @wixFieldType boolean */
  installationSupport?: boolean;
}
