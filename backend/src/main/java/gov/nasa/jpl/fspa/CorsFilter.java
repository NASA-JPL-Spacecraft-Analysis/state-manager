package gov.nasa.jpl.fspa;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;

public class CorsFilter implements ContainerResponseFilter {
    @Override
    public void filter(ContainerRequestContext request, ContainerResponseContext response) {
        if(System.getenv("CORS_ALLOW_ORIGIN") == null){
            response.getHeaders().add("Access-Control-Allow-Origin", "*");
        }
        else {
            response.getHeaders().add("Access-Control-Allow-Origin", System.getenv("CORS_ALLOW_ORIGIN"));
        }
        response.getHeaders().add("Access-Control-Allow-Headers", "*");
        response.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        response.getHeaders().add("Access-Control-Allow-Credentials", "true");
    }
}
