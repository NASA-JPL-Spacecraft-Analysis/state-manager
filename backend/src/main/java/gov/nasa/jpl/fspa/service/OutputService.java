package gov.nasa.jpl.fspa.service;

import java.util.List;

public interface OutputService<T> {
   String outputAsCsv(List<T> objectList);
}
