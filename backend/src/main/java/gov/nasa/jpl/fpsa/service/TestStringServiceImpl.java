package gov.nasa.jpl.fpsa.service;

import gov.nasa.jpl.fpsa.dao.TestStringDao;
import gov.nasa.jpl.fpsa.dao.TestStringDaoImpl;
import gov.nasas.jpl.fpsa.model.TestString;

import java.util.List;

public class TestStringServiceImpl implements TestStringService {
    private final TestStringDao testStringDao;

    public TestStringServiceImpl() {
        this.testStringDao = new TestStringDaoImpl();
    }

    @Override
    public List<TestString> getTestStrings() {
        return testStringDao.getTestStrings();
    }

    @Override
    public List<TestString> postNewData(String data) {
        testStringDao.postNewData(data);

        return testStringDao.getTestStrings();
    }
}
