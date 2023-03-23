const base = "id,libelle,sous_libelle,ordre";
const prix = "prix.item.*";
const image = `
    images.directus_files_id.id,
    images.directus_files_id.title,
    images.directus_files_id.description
    `;
const MENU =  `${base}`;
const PARTIAL_SPACES = `${base},${image},${prix}`;

export {MENU,PARTIAL_SPACES};