package de.moduliertersingvogel.micro;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@RequestScoped
@Path("test")
public class SimpleEndpoint {
	@Inject
	SimpleObject obj;
	
	@GET
	public Response test() {
		if(obj.callMe()) {
			return Response.ok().entity("Hello World").build();
		}
		return Response.status(Status.BAD_REQUEST).entity("Something went wrong").build();
	}
}
