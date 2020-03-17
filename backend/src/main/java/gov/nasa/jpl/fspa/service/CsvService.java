package gov.nasa.jpl.fspa.service;

import java.io.InputStream;
import java.util.List;

public interface CsvService<T> {
   String outputAsCsv(List<T> objectList);
   List<T> parseCsv(InputStream inputStream);
}
