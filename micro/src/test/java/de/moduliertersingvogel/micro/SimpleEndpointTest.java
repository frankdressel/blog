package de.moduliertersingvogel.micro;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.meecrowave.Meecrowave;
import org.apache.meecrowave.junit5.MeecrowaveConfig;
import org.apache.meecrowave.testing.ConfigurationInject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@MeecrowaveConfig /*(some config)*/
public class SimpleEndpointTest {
    @ConfigurationInject
    private Meecrowave.Builder config;
	private static OkHttpClient client;
	
	@BeforeAll
	public static void setup() {
		client = new OkHttpClient();
	}

	@Test
	public void test() throws Exception {
		final String base = "http://localhost:" + config.getHttpPort();
		
		Request request = new Request.Builder()
	      .url(base+"/test")
	      .build();
		Response response = client.newCall(request).execute();
		assertEquals("Hello World",  response.body().string());
	}
}
