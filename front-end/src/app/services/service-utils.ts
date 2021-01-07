import { environment } from '../../environments/environment';

const { baseUrl } = environment;

export const addCollectionId = (collectionId: number): string  => baseUrl + '/collection/' + collectionId + '/';

export const setFormData = (file: File): FormData => {
  const formData = new FormData();

  formData.append('file', file);

  return formData;
};
