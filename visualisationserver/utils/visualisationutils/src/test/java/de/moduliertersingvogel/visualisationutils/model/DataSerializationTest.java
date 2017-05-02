package de.moduliertersingvogel.visualisationutils.model;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.Test;

public class DataSerializationTest {

	@Test
	public void testSerializationToJSON() {
		List<Object> values = Arrays.asList(new Object[] { "Hallo", "Welt", 12, 34 });
		String date = "2017-03-04T14:23:12";
		Data testData = new Data(date, values);
		
		ArrayList<Object> list = new ArrayList<>(values);
		list.add(0, date);
		
		String expected = list.stream().map(o->o.toString()).collect(Collectors.joining(", "));
		assertEquals(expected, testData.toString());
	}
}
