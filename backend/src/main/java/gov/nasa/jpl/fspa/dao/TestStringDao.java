package gov.nasa.jpl.fspa.dao;

import gov.nasa.jpl.fspa.model.TestString;

import java.util.List;

public interface TestStringDao {
    List<TestString> getTestStrings();
    void postNewData(String data);
}
