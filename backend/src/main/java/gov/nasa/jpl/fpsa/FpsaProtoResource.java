package gov.nasa.jpl.fpsa;

import gov.nasa.jpl.fpsa.dao.TestStringDao;
import gov.nasa.jpl.fpsa.dao.TestStringDaoImpl;
import gov.nasas.jpl.fpsa.model.TestString;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("v1/")
public class FpsaProtoResource {
    private final TestStringDao testStringDao;

    public FpsaProtoResource() {
        testStringDao = new TestStringDaoImpl();
    }

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public Response test() {
        List<TestString> testStrings = testStringDao.getTestStrings();

        if (testStrings.isEmpty()) {
            return Response.status(Response.Status.NO_CONTENT).build();
        }

        return Response.status(Response.Status.OK).entity(testStrings).build();
    }
}
