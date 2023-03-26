const base = "id,libelle,sous_libelle,ordre";
const prix = "prix.prix_id.valeur,prix.prix_id.date";
const image = `
    images.directus_files_id.id,
    images.directus_files_id.title,
    images.directus_files_id.description,
    images.directus_files_id.*

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
const MENU =  `${base},slug`;
const ENTREPRISE =  `id,nom,abstrait,description,*,${adresse},${contact},${image},${revue}`;
const PARTIAL_SPACES = `${base},${image},${prix}`;

export {MENU, PARTIAL_SPACES, ENTREPRISE};