package de.moduliertersingvogel.visualisationutils.model;

import java.util.List;
import java.util.stream.Collectors;

public class Data {
	public final Object date;
	public final List<Object> values;

	public Data(Object date, List<Object> values) {
		this.date = date;
		this.values = values;
	}

	@Override
	public String toString() {
		return String.format("%s,%s", this.date, this.values.stream().map(d->d.toString()).collect(Collectors.joining(",")));
	}
}
