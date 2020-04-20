package gov.nasa.jpl.fspa.informationtypes.service;

import gov.nasa.jpl.fspa.model.InformationTypes;
import gov.nasa.jpl.fspa.model.InformationTypesEnum;

import java.util.List;
import java.util.Map;

public interface InformationTypesService {
    Map<InformationTypesEnum, Map<Integer, InformationTypes>> getInformationTypes();

    Map<InformationTypesEnum, Map<Integer, InformationTypes>> saveUploadedInformationTypes(List<InformationTypes> informationTypesList);
}
