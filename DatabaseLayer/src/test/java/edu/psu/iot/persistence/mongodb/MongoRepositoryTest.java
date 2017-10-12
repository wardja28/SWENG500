package edu.psu.iot.persistence.mongodb;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.mongodb.MongoClient;
import com.mongodb.MongoSocketOpenException;

import edu.psu.iot.database.DatabaseRepository;
import edu.psu.iot.database.mongodb.MongoRepository;
import edu.psu.iot.object.Device;
import edu.psu.iot.object.Payload;
import edu.psu.iot.object.ResponseData;
import edu.psu.iot.object.Sensor;

public class MongoRepositoryTest {

	DatabaseRepository objectUnderTest = new MongoRepository();
	
	@Before
	public void setUp() {
		
	}
	
	/**
	 * should find a copy of the mongo database running on localhost:27017, default port for MongoDB
	 * Fails outright if the mongoDB instance is not active.
	 */
	@Test
	public void testLocalhostDatabaseConnectivity() {
		 try {

			MongoClient mongoClient = new MongoClient();
		 } catch (MongoSocketOpenException ex) {
			 System.out.println("database not active, failing test");
			 fail();
		 } catch (Exception ex) {
			 System.out.println("unknown exception, failing test, look at the stack trace.");
			 ex.printStackTrace();
			 fail();
		 }
	}
	
	/**
	 * perform all CRUD operations for a device.
	 */
	@Test
	public void deviceCrud() {
			 Device initialDevice = new Device();
			 initialDevice.setName("SAMPLER");
			 Device resultDevice = objectUnderTest.createDevice(initialDevice);//create
			 resultDevice.setName("NewName");
			 System.out.println(resultDevice.getId());
			 objectUnderTest.updateDevice(resultDevice);//update
			 Device readResultDevice = objectUnderTest.readDeviceById(resultDevice.getId());//read
			 assertEquals(resultDevice.getName(), readResultDevice.getName());

			 assertTrue(objectUnderTest.deleteDevice(resultDevice.getId()));
	}
	
	/**
	 * perform all CRUD operations for a sensor.
	 */
	@Test
	public void sensorCrud() {
			 Sensor initialObject = new Sensor();
			 initialObject.setName("sampleSensor.");
			 Sensor resultSensor = objectUnderTest.createSensor(initialObject);//create
			 resultSensor.setName("NewName");
			 objectUnderTest.updateSensor(resultSensor);//update
			 Sensor readResult = objectUnderTest.readSensorById(resultSensor.getId());//read
			 assertEquals(resultSensor.getName(), readResult.getName());
			 assertTrue(objectUnderTest.deleteSensor(resultSensor.getId()));
	}
	
	/**
	 * Payload does not have Update operations available.
	 */
	/*
	@Test
	public void payloadCrd() {
			 Payload initialObject = new Payload();
			 initialObject.setCreatedDateTime(new Date());
			 Payload resultPayload = objectUnderTest.createPayload(initialObject);//create
			 Payload readResult = objectUnderTest.readPayloadById(resultPayload.getId());//read
			 assertEquals(resultPayload.getCreatedDateTime(), readResult.getCreatedDateTime());
			 assertTrue(objectUnderTest.deletePayload(resultPayload.getId()));

	}
	*/
	/**
	 * ResponseData crud, also does not have Update operation available.
	 */
	@Test
	public void responseDataCrd() {
		ResponseData initialObject = new ResponseData();
			 initialObject.setCreatedDateTime(new Date());
			 ResponseData resultPayload = objectUnderTest.createResponseData(initialObject);//create
			 ResponseData readResult = objectUnderTest.readResponseDataById(resultPayload.getId());//read
			 assertEquals(resultPayload.getCreatedDateTime(), readResult.getCreatedDateTime());
			 assertTrue(objectUnderTest.deleteResponseData(resultPayload.getId()));

	}
	
	//insert a bunch of devices and then see if they all come back from the database after
	//Note, as written this will fail right out when we're actually putting data in and not deleting after.
	@Test
	public void getAllDevices() {

		 Device initialDevice = new Device();
		 initialDevice.setName("SAMPLER");
		 Device resultDevice = objectUnderTest.createDevice(initialDevice);//create
		 initialDevice.setName("Number 2");
		 Device resultDevice2 = objectUnderTest.createDevice(initialDevice);//create
		 initialDevice.setName("Number three");
		 Device resultDevice3 = objectUnderTest.createDevice(initialDevice);//create
		 
		 List<Device> resultList = objectUnderTest.getAllDevices();
		 
		 //cleanup
		 objectUnderTest.deleteDevice(resultDevice.getId());
		 objectUnderTest.deleteDevice(resultDevice2.getId());
		 objectUnderTest.deleteDevice(resultDevice3.getId());
		 
		 assertTrue(resultList.contains(resultDevice3));
		 assertTrue(resultList.contains(resultDevice2));
		 assertTrue(resultList.contains(resultDevice));
	}
	
	/**
	 * Add 3 pieces of ResponseData to the database, then query the DB for the two with a requestData sensor ID of "asdf"
	 */
	@Test
	public void getAllPayloadResponsesBySensorId() {
		//TODO
		ResponseData initialObject = new ResponseData();
		Payload requestData = new Payload();
		requestData.setSensorId("asdf");
		initialObject.setRequestData(requestData);
		
		ResponseData success1 = objectUnderTest.createResponseData(initialObject);//create
		ResponseData success2 = objectUnderTest.createResponseData(initialObject);//create 2
		
		requestData.setSensorId("fdsa");
		ResponseData success3 = objectUnderTest.createResponseData(initialObject);//create 3, this one has a different payload sensorID
		
		String sensorId = "asdf";
		
		List<ResponseData> results = objectUnderTest.getAllPayloadResponsesBySensorId(sensorId);
		
		//cleanup.
		objectUnderTest.deleteResponseData(success1.getId());
		objectUnderTest.deleteResponseData(success2.getId());
		objectUnderTest.deleteResponseData(success3.getId());
		assertEquals(results.size(), 2);
	}
	
	/**
	 * Insert a device into the database, then delete it. then try to read that device's ID again. Should come up null.
	 */
	@Test
	public void readNothingFromDatabase() {
		 Device initialDevice = new Device();
		 initialDevice = objectUnderTest.createDevice(initialDevice);//create
		 objectUnderTest.deleteDevice(initialDevice.getId());
		 Device readResultDevice = objectUnderTest.readDeviceById(initialDevice.getId());//read
		 assertNull(readResultDevice);
	}

}