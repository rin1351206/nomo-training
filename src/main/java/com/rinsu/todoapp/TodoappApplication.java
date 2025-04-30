package com.rinsu.todoapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.microsoft.applicationinsights.attach.ApplicationInsights;

@SpringBootApplication
public class TodoappApplication {

	public static void main(String[] args) {
		ApplicationInsights.attach();
		SpringApplication.run(TodoappApplication.class, args);
	}

}
