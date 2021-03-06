# INTRODUCTION

Holiday Assistant is a web application developed using web technologies and frameworks with fully responsive in all devices where the users are allowed to book flights and hotels for their vacation within Europe.

## Technology Stack
1. 	ReactJS
2.	WebAPI 2(ASP .NET Core 2.2)
3.	Docker
4.	Microsoft Sql Server 2017
5.	Microservices


# ARCHITECTURE

![holiday architecture](https://user-images.githubusercontent.com/52786804/64127126-c1bf7900-cdb0-11e9-8935-f5b66886c8e9.png)

## FRONT END

- React JS is a JavaScript library for building user interfaces.
- It can be used in the development of single page or mobile applications. It usually requires the use of additional libraries for state management, routing and interaction with an API.
- The main idea behind this library is to build large-scale applications with data that changes repeatedly over time and it tackles the challenge well.

## AMADEUS API

Amadeus is a global distribution system owned by the Amadeus IT Group. Amadeus provides the technology that keeps the travel sector in motion – from initial search and ticketing right through to check-in and departure. 
This products and solutions help to improve the business performance of our customers such as travel agencies, corporations, airlines, ground handlers, hotels, railways, car rental companies, airports, cruise lines and ferry operators.
For instance, this algorithms trained with a lot of meaningful features from search data of flight such as flight duration, number of stops, number of connections, departure time, arrival time, pricing, and gate.

![amadeus](https://user-images.githubusercontent.com/52786804/64127125-c126e280-cdb0-11e9-89d6-78470b08c7d5.png)

## How to Use AMADEUS

![amadeus use](https://user-images.githubusercontent.com/52786804/64127124-c126e280-cdb0-11e9-8f09-a0a3974f2840.png)

## Microservices and Implementing API Gateway using Ocelot

![microservice](https://user-images.githubusercontent.com/52786804/64127127-c1bf7900-cdb0-11e9-992a-563c18bfa191.png)

Ocelot is basically a set of middlewares that you can apply in a specific order. Ocelot is designed to work with ASP.NET Core only. The main functionality of an Ocelot API Gateway is to take incoming HTTP requests and forward them on to a downstream service, currently as another HTTP request. Ocelot’s describes the routing of one request to another as a Re-Route.

## DOCKER

Docker containers wrap up software and its dependencies into a standardized unit for software development that includes everything it needs to run code, runtime, system tools and libraries. Application will always run the same and makes collaboration as simple as sharing a container image.

## SQL SERVER

SQL is used to manage the users data such as user information, flight bookings, hotel bookings, flight and hotel cancellation. SQL Server is built as a image using docker container.

![hotel booking](https://user-images.githubusercontent.com/52786804/64127469-10214780-cdb2-11e9-896f-1b120ba789eb.png)

