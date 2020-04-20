package gov.nasa.jpl.fspa.util;

import com.opencsv.bean.AbstractBeanField;
import gov.nasa.jpl.fspa.model.InformationTypesEnum;

public class ConvertIntegerToEnum<T> extends AbstractBeanField<T> {
    @Override
    protected Object convert(String value) {
       if (value == null || value.equals("")) {
           return null;
       }

       return InformationTypesEnum.values()[Integer.parseInt(value)];
    }
}
