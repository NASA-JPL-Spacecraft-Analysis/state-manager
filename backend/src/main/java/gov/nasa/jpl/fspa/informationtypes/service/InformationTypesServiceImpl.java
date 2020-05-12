package gov.nasa.jpl.fspa.informationtypes.service;

import gov.nasa.jpl.fspa.informationtypes.dao.InformationTypesDao;
import gov.nasa.jpl.fspa.informationtypes.dao.InformationTypesDaoImpl;
import gov.nasa.jpl.fspa.model.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InformationTypesServiceImpl implements InformationTypesService {
    private final InformationTypesDao informationTypesDao;

    public InformationTypesServiceImpl() {
        this.informationTypesDao = new InformationTypesDaoImpl();
    }

    @Override
    public List<InformationTypes> convertInformationTypesUpload(List<InformationTypesUpload> informationTypesUploadList) {
        List<InformationTypes> informationTypesList = new ArrayList<>();

        for (InformationTypesUpload informationTypesUpload: informationTypesUploadList) {
            InformationTypes informationTypes = new InformationTypes();

            informationTypes.setType(InformationTypesEnum.valueOf(informationTypesUpload.getInformationType()));
            informationTypes.setIdentifier(informationTypesUpload.getIdentifier());
            informationTypes.setDisplayName(informationTypesUpload.getDisplayName());
            informationTypes.setDescription(informationTypesUpload.getDescription());
            informationTypes.setExternalLink(informationTypesUpload.getExternalLink());

            informationTypesList.add(informationTypes);
        }

        return informationTypesList;
    }

    @Override
    public Map<InformationTypesEnum, Map<Integer, InformationTypes>> getInformationTypes() {
        List<InformationTypes> informationTypesList = informationTypesDao.getInformationTypes();
        Map<InformationTypesEnum, Map<Integer, InformationTypes>> informationTypesMap = new HashMap<>();

        if (informationTypesList.size() > 0) {
            // Populate our map with each type of Information Type.
            for (InformationTypesEnum informationTypesEnumValue: InformationTypesEnum.values()) {
                informationTypesMap.put(informationTypesEnumValue, new HashMap<Integer, InformationTypes>());
            }

            for (InformationTypes informationTypes: informationTypesList) {
                informationTypesMap.get(informationTypes.getType()).put(informationTypes.getId(), informationTypes);
            }
        }

        return informationTypesMap;
    }

    @Override
    public Map<InformationTypesEnum, Map<Integer, InformationTypes>> saveUploadedInformationTypes(List<InformationTypes> informationTypesList) {
        informationTypesDao.saveInformationTypes(informationTypesList);

        return getInformationTypes();
    }
}
