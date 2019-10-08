package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.model.TestString;

import java.util.List;

public interface TestStringService {
    List<TestString> getTestStrings();
    List<TestString> postNewData(String data);
}
