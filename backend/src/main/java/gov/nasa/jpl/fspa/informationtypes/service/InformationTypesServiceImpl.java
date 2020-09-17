package gov.nasa.jpl.fspa.informationtypes.service;

import gov.nasa.jpl.fspa.informationtypes.dao.InformationTypesDao;
import gov.nasa.jpl.fspa.informationtypes.dao.InformationTypesDaoImpl;
import gov.nasa.jpl.fspa.model.*;
import gov.nasa.jpl.fspa.service.ValidationService;
import gov.nasa.jpl.fspa.service.ValidationServiceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InformationTypesServiceImpl implements InformationTypesService {
    private final InformationTypesDao informationTypesDao;
    private final ValidationService validationService;

    public InformationTypesServiceImpl() {
        informationTypesDao = new InformationTypesDaoImpl();
        validationService = new ValidationServiceImpl();
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
    public Map<InformationTypesEnum, Map<Integer, InformationTypes>> getInformationTypes(int collectionId) {
        return mapInformationTypes(informationTypesDao.getInformationTypes(collectionId));
    }

    @Override
    public Map<InformationTypesEnum, Map<String, InformationTypes>> getInformationTypesByIdentifier(int collectionId) {
        List<InformationTypes> informationTypesList = informationTypesDao.getInformationTypes(collectionId);
        Map<InformationTypesEnum, Map<String, InformationTypes>> informationTypesMap = new HashMap<>();

        if (informationTypesList.size() > 0) {
            // Populate our map with each type of Information Type.
            for (InformationTypesEnum informationTypesEnumValue: InformationTypesEnum.values()) {
                informationTypesMap.put(informationTypesEnumValue, new HashMap<String, InformationTypes>());
            }

            for (InformationTypes informationTypes: informationTypesList) {
                informationTypesMap.get(informationTypes.getType()).put(informationTypes.getIdentifier(), informationTypes);
            }
        }

        return informationTypesMap;
    }

    @Override
    public Map<InformationTypesEnum, Map<Integer, InformationTypes>> saveUploadedInformationTypes(List<InformationTypes> informationTypesList, int collectionId) {
        if (checkDuplicateInformationTypes(informationTypesList, collectionId).size() > 0) {
            return null;
        }

        for (InformationTypes informationTypes: informationTypesList) {
            informationTypes.setCollectionId(collectionId);

            saveInformationTypes(informationTypes);
        }

        return getInformationTypes(collectionId);
    }

    private List<String> checkDuplicateInformationTypes(List<InformationTypes> informationTypesList, int collectionId) {
        Map<InformationTypesEnum, Map<Integer, InformationTypes>> currentInformationTypesMap = getInformationTypes(collectionId);
        List<InformationTypes> uploadedInformationTypesList = new ArrayList<>();
        List<String> duplicateIdentifiers = new ArrayList<>();

        // Look at each information type we currently have, and check if the user is posting duplicate identifiers.
        for (InformationTypesEnum informationTypesEnum: InformationTypesEnum.values()) {
            for (InformationTypes informationTypes: informationTypesList) {
                if (informationTypes.getType() == informationTypesEnum) {
                    uploadedInformationTypesList.add(informationTypes);
                }
            }

            duplicateIdentifiers.addAll(validationService.getDuplicateIdentifiers(uploadedInformationTypesList,
                    getInformationTypesIdentifiers(currentInformationTypesMap.get(informationTypesEnum))));
        }

        return duplicateIdentifiers;
    }

    private Map<String, Integer> getInformationTypesIdentifiers(Map<Integer, InformationTypes> informationTypesMap) {
        Map<String, Integer> informationTypeIdentifierMap = new HashMap<>();

        if (informationTypesMap != null) {
            for (int id: informationTypesMap.keySet()) {
                InformationTypes informationType = informationTypesMap.get(id);

                informationTypeIdentifierMap.put(informationType.getIdentifier(), informationType.getId());
            }
        }

        return informationTypeIdentifierMap;
    }

    private Map<InformationTypesEnum, Map<Integer, InformationTypes>> mapInformationTypes(List<InformationTypes> informationTypesList) {
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

    private InformationTypes saveInformationTypes(InformationTypes informationTypes) {
        return informationTypesDao.saveInformationTypes(informationTypes);
    }
}
