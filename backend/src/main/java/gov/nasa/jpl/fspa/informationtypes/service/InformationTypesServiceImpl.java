package gov.nasa.jpl.fspa.informationtypes.service;

import gov.nasa.jpl.fspa.informationtypes.dao.InformationTypesDao;
import gov.nasa.jpl.fspa.informationtypes.dao.InformationTypesDaoImpl;
import gov.nasa.jpl.fspa.model.InformationTypes;
import gov.nasa.jpl.fspa.model.InformationTypesEnum;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InformationTypesServiceImpl implements InformationTypesService {
    private final InformationTypesDao informationTypesDao;

    public InformationTypesServiceImpl() {
        this.informationTypesDao = new InformationTypesDaoImpl();
    }

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
