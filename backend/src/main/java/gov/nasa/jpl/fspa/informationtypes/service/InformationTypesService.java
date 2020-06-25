package gov.nasa.jpl.fspa.informationtypes.service;

import gov.nasa.jpl.fspa.model.InformationTypes;
import gov.nasa.jpl.fspa.model.InformationTypesEnum;
import gov.nasa.jpl.fspa.model.InformationTypesUpload;

import java.util.List;
import java.util.Map;

public interface InformationTypesService {
    List<InformationTypes> convertInformationTypesUpload(List<InformationTypesUpload> informationTypesUploadList);

    Map<InformationTypesEnum, Map<Integer, InformationTypes>> getInformationTypes(int collectionId);

    Map<InformationTypesEnum, Map<String, InformationTypes>> getInformationTypesByIdentifier(int collectionId);

    Map<InformationTypesEnum, Map<Integer, InformationTypes>> saveUploadedInformationTypes(List<InformationTypes> informationTypesList, int collectionId);
}
