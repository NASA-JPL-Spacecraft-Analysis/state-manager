package gov.nasa.jpl.fspa;

import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("api")
public class StateManagementApplication extends ResourceConfig {
    public StateManagementApplication() {
        register(CorsFilter.class);
        register(MultiPartFeature.class);
        register(StateManagementResource.class);
    }
}
