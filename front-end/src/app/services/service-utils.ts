import { environment } from '../../environments/environment';

const { baseUrl } = environment;

export function addCollectionId(collectionId: number): string {
  return baseUrl + '/collection/' + collectionId + '/';
}

export function setFormData(file: File): FormData {
  const formData = new FormData();

  formData.append('file', file);

  return formData;
}
