package de.moduliertersingvogel.visualisationserver;

import java.net.InetAddress;
import java.net.URI;
import java.net.UnknownHostException;
import java.util.Locale;

import javax.ws.rs.core.UriBuilder;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.jdkhttp.JdkHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import com.sun.net.httpserver.HttpServer;

public class Server {
	private static final int PORT = 8080;
	private static Logger logger = LogManager.getLogger("de.moduliertersingvogel.visualisationserver");;

	public static void main(String[] args) {
		ResourceConfig resourceConfig = new ResourceConfig();
		resourceConfig.packages("de.moduliertersingvogel.visualisationserver");
		resourceConfig.register(JacksonFeature.class);
		resourceConfig.register(CORSFilter.class);
		logger.info("Jersey set up");
		
		Locale.setDefault(Locale.ENGLISH);

		String hostName = "localhost";
		try {
			hostName = InetAddress.getLocalHost().getCanonicalHostName();
		} catch (UnknownHostException e) {
			e.printStackTrace();
			logger.error("Could not get hostname.", e);
		}

		URI uri = UriBuilder.fromUri("http://" + hostName + "/").port(PORT).build();

		HttpServer server = JdkHttpServerFactory.createHttpServer(uri, resourceConfig);
		logger.info("Server started");
	}
}
