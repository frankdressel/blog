package de.moduliertersingvogel.visualisationclient;

import java.io.IOException;
import java.util.List;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import com.google.gson.Gson;

import de.moduliertersingvogel.visualisationutils.model.Data;
import de.moduliertersingvogel.visualisationutils.model.RawData;

public class Client {
	private final String uri;
	private final Gson gson;

	public Client(String uri) throws ClientException {
		this.gson = new Gson();
		this.uri=uri.replaceAll("/+$", "");
	}

	public void pushData(final String topic, Data[] data) throws ClientException {
		try {
			CloseableHttpClient client = HttpClientBuilder.create().build();
			HttpPost httpPost = new HttpPost(this.uri+"/"+topic+"/single");
			httpPost.setEntity(new StringEntity(gson.toJson(data), ContentType.APPLICATION_JSON));
			CloseableHttpResponse response = client.execute(httpPost);
			System.out.println(EntityUtils.toString(response.getEntity()));
		} catch (IOException e) {
			throw new ClientException(e);
		}
	}

	public void pushData(final String topic, final List<List<RawData>> data) throws ClientException {
		try {
			CloseableHttpClient client = HttpClientBuilder.create().build();
			HttpPost httpPost = new HttpPost(this.uri+"/"+topic+"/single");
			httpPost.setEntity(new StringEntity(gson.toJson(data)));
			CloseableHttpResponse response = client.execute(httpPost);
		} catch (IOException e) {
			throw new ClientException(e);
		}
	}
}
