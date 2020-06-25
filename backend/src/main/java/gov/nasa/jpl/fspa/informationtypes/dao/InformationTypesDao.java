package gov.nasa.jpl.fspa.informationtypes.dao;

import gov.nasa.jpl.fspa.model.InformationTypes;

import java.util.List;

public interface InformationTypesDao {
    List<InformationTypes> getInformationTypes(int collectionId);

    InformationTypes saveInformationTypes(InformationTypes informationTypes);
}
