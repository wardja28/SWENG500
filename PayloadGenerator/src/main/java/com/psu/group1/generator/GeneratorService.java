package com.psu.group1.generator;


import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;






/**
 * Hello world!
 *
 */
public class GeneratorService 
{
    GeneratorService()
    {
    	Payload payload = new Payload();
        ScheduledExecutorService ses = Executors.newScheduledThreadPool(5);
        ses.scheduleAtFixedRate(payload, 0, 5, TimeUnit.SECONDS);

    }
}
