package gov.nasa.jpl.fspa.informationtypes.dao;

import gov.nasa.jpl.fspa.model.InformationTypes;

import java.util.List;

public interface InformationTypesDao {
    List<InformationTypes> getInformationTypes();

    void saveInformationTypes(List<InformationTypes> informationTypesList);
}
