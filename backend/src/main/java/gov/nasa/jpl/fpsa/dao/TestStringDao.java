package gov.nasa.jpl.fpsa.dao;

import gov.nasas.jpl.fpsa.model.TestString;

import java.util.List;

public interface TestStringDao {
    List<TestString> getTestStrings();
}
