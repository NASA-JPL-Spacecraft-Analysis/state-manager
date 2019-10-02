package gov.nasa.jpl.fspa.service;

import gov.nasa.jpl.fspa.dao.TestStringDao;
import gov.nasa.jpl.fspa.dao.TestStringDaoImpl;
import gov.nasa.jpl.fspa.model.TestString;

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
