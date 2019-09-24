package gov.nasa.jpl.fpsa.service;

import gov.nasas.jpl.fpsa.model.TestString;

import java.util.List;

public interface TestStringService {
    List<TestString> getTestStrings();
    List<TestString> postNewData(String data);
}
