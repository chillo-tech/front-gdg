const METADATA=`metadonnees.titre,metadonnees.description,metadonnees.mots_cles`;
const base = `id,libelle,sous_libelle,ordre,${METADATA}`;
const prix = "prix.prix_id.valeur,prix.prix_id.date";
const image = `
    images.directus_files_id.id,
    images.directus_files_id.title,
    images.directus_files_id.description
    `;
const type = `
    types.type_id.id,
    types.type_id.libelle,
    types.type_id.description,
    types.type_id.prix.item.valeur,
    types.type_id.prix.item.date
    `;
const loisirs = `
  loisirs.id,
  loisirs.description,
  loisirs.distance,
  loisirs.libelle,
  loisirs.images.id,
  loisirs.images.title,
  loisirs.images.description
`;
const adresse = `
  adresse.item.code_postal,
  adresse.item.latitude,
  adresse.item.longitude,
  adresse.item.rue,
  adresse.item.ville
`;
const contact = `
contact.item.email,
contact.item.telephone
`;
const revue = `
revue.item.commentaire,
revue.item.date,
revue.item.M,
revue.item.nom,
revue.item.prenom
`;
const MENU =  `${base},${image},slug,display`;
const MENUFULL =  `
      ${base},
      ${image},
      formulaire,
      slug,
      display,
      espaces.espace_id.id,
      espaces.espace_id.libelle,
      espaces.espace_id.prix,
      espaces.espace_id.types.type_id.id,
      espaces.espace_id.types.type_id.libelle,
      espaces.espace_id.types.type_id.description,
      espaces.espace_id.types.type_id.prix.item.valeur,
      espaces.espace_id.types.type_id.prix.item.date,
      espaces.espace_id.slug,
      espaces.espace_id.ordre,
      espaces.espace_id.images.directus_files_id.id,
      espaces.espace_id.images.directus_files_id.title,
      espaces.espace_id.images.directus_files_id.description
    `;
const ENTREPRISE =  `
  id,nom,abstrait,description,contacts.telephone,
  services.id,
  services.description,
  services.distance,
  services.nom_service,
  services.image_service.id,
  services.image_service.title,
  services.image_service.description,
  ${loisirs},
  ${adresse},
  ${image},
  ${revue}
`;
const PARTIAL_SPACES = `${base},${image},${prix},${type},slug`;

export {MENU, MENUFULL, PARTIAL_SPACES, ENTREPRISE};