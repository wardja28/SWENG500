package edu.psu.iot.object;

import java.util.Date;
import java.util.Map;

import edu.psu.iot.object.intf.JsonObject;

// An individual set of fields sent from a device to the endpoint, timestamped with when it was created.
//TODO confirm name.
public class Payload extends JsonObject {

	private Long id;
	
	private Date createdDateTime;
	
	//TODO should this actually be a single string in JSON format by now?
	private Map<String, String> payloadData;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Map<String, String> getPayloadData() {
		return payloadData;
	}

	public void setPayloadData(Map<String, String> payloadData) {
		this.payloadData = payloadData;
	}
	

	public String toJsonString() {
		//TODO;
		return null;
	}
}