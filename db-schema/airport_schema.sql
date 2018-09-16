--------------------------------------------------------
--  AIRPORT SCHEMA SCRIPT
--------------------------------------------------------
DROP TABLE "AIRPORT"."AIRLINES";
DROP TABLE "AIRPORT"."AIRPORTS";
DROP TABLE "AIRPORT"."CHECK_IN_DATA";
DROP TABLE "AIRPORT"."FLIGHTS";
--------------------------------------------------------
--  DDL for Table AIRLINES
--------------------------------------------------------

  CREATE TABLE "AIRPORT"."AIRLINES" 
   (	"ID" NUMBER, 
	"CODE" VARCHAR2(10 BYTE), 
	"NAME" VARCHAR2(100 BYTE)
   )
--------------------------------------------------------
--  DDL for Table AIRPORTS
--------------------------------------------------------

  CREATE TABLE "AIRPORT"."AIRPORTS" 
   (	"ID" NUMBER, 
	"NAME" VARCHAR2(100 BYTE), 
	"CODE" VARCHAR2(5 BYTE), 
	"CITY" VARCHAR2(20 BYTE), 
	"COUNTRY" VARCHAR2(100 BYTE)
   );
--------------------------------------------------------
--  DDL for Table CHECK_IN_DATA
--------------------------------------------------------

  CREATE TABLE "AIRPORT"."CHECK_IN_DATA" 
   (	"FIRST_NAME" VARCHAR2(50 BYTE), 
	"LAST_NAME" VARCHAR2(100 BYTE), 
	"FLIGHT_NO" VARCHAR2(20 BYTE), 
	"IDENTIFICATION" VARCHAR2(40 BYTE), 
	"HAS_CHECK_IN_LUGGAGE" VARCHAR2(1 BYTE), 
	"CHECKED_IN_ON" TIMESTAMP (6), 
	"ID_NUMBER" VARCHAR2(40 BYTE)
   );
--------------------------------------------------------
--  DDL for Table FLIGHTS
--------------------------------------------------------

  CREATE TABLE "AIRPORT"."FLIGHTS" 
   (	"FLIGHT_NUMBER" VARCHAR2(20 BYTE), 
	"DATE_TIME" TIMESTAMP (6), 
	"IS_ARRIVAL" VARCHAR2(1 BYTE), 
	"PLACE" NUMBER, 
	"AIRLINE" NUMBER
   ) ;

REM INSERTING into AIRPORT.AIRLINES
SET DEFINE OFF;
Insert into AIRPORT.AIRLINES (ID,CODE,NAME) values (5,'KL','KLM Dutch Royal Airlines');
Insert into AIRPORT.AIRLINES (ID,CODE,NAME) values (1,'LH','Lufthansa');
Insert into AIRPORT.AIRLINES (ID,CODE,NAME) values (2,'BA','British Airways');
Insert into AIRPORT.AIRLINES (ID,CODE,NAME) values (3,'FR','Ryanair');
Insert into AIRPORT.AIRLINES (ID,CODE,NAME) values (4,'AA','American Airlines');
REM INSERTING into AIRPORT.AIRPORTS
SET DEFINE OFF;
Insert into AIRPORT.AIRPORTS (ID,NAME,CODE,CITY,COUNTRY) values (1,'London Heathrow Airport','LHR','London','United Kingdom');
Insert into AIRPORT.AIRPORTS (ID,NAME,CODE,CITY,COUNTRY) values (2,'Kugaaruk Airport','YBB','Pelly Bay','Canada');
Insert into AIRPORT.AIRPORTS (ID,NAME,CODE,CITY,COUNTRY) values (3,'Pokhara Airport','PKR','Pokhara','Nepal');
Insert into AIRPORT.AIRPORTS (ID,NAME,CODE,CITY,COUNTRY) values (4,'Munich International Airport','MUC','Munich','Germany');
REM INSERTING into AIRPORT.CHECK_IN_DATA
SET DEFINE OFF;
Insert into AIRPORT.CHECK_IN_DATA (FIRST_NAME,LAST_NAME,FLIGHT_NO,IDENTIFICATION,HAS_CHECK_IN_LUGGAGE,CHECKED_IN_ON,ID_NUMBER) values ('Dan','Jones','FR5702','Driving License','Y',to_timestamp('13-NOV-17 07.52.03.281000000 PM','DD-MON-RR HH.MI.SSXFF AM'),'123EF677');
Insert into AIRPORT.CHECK_IN_DATA (FIRST_NAME,LAST_NAME,FLIGHT_NO,IDENTIFICATION,HAS_CHECK_IN_LUGGAGE,CHECKED_IN_ON,ID_NUMBER) values ('John','Doe','BA0071','Passport','Y',to_timestamp('10-NOV-17 12.23.48.000000000 PM','DD-MON-RR HH.MI.SSXFF AM'),'AM112233');
Insert into AIRPORT.CHECK_IN_DATA (FIRST_NAME,LAST_NAME,FLIGHT_NO,IDENTIFICATION,HAS_CHECK_IN_LUGGAGE,CHECKED_IN_ON,ID_NUMBER) values ('Dan','Jones','BA0071','Driving License','N',to_timestamp('06-NOV-17 12.23.48.000000000 PM','DD-MON-RR HH.MI.SSXFF AM'),'123EF677');
Insert into AIRPORT.CHECK_IN_DATA (FIRST_NAME,LAST_NAME,FLIGHT_NO,IDENTIFICATION,HAS_CHECK_IN_LUGGAGE,CHECKED_IN_ON,ID_NUMBER) values ('Dan','Jones','AA3221','Driving License','N',to_timestamp('06-NOV-17 12.23.48.000000000 PM','DD-MON-RR HH.MI.SSXFF AM'),'123EF677');
Insert into AIRPORT.CHECK_IN_DATA (FIRST_NAME,LAST_NAME,FLIGHT_NO,IDENTIFICATION,HAS_CHECK_IN_LUGGAGE,CHECKED_IN_ON,ID_NUMBER) values ('John','Doe','AA3221','Passport','Y',to_timestamp('10-NOV-17 12.23.49.000000000 PM','DD-MON-RR HH.MI.SSXFF AM'),'AM112233');
Insert into AIRPORT.CHECK_IN_DATA (FIRST_NAME,LAST_NAME,FLIGHT_NO,IDENTIFICATION,HAS_CHECK_IN_LUGGAGE,CHECKED_IN_ON,ID_NUMBER) values ('Dan','Jones','LH9981','Driving License','N',to_timestamp('06-NOV-17 12.23.48.000000000 PM','DD-MON-RR HH.MI.SSXFF AM'),'123EF677');
REM INSERTING into AIRPORT.FLIGHTS
SET DEFINE OFF;
Insert into AIRPORT.FLIGHTS (FLIGHT_NUMBER,DATE_TIME,IS_ARRIVAL,PLACE,AIRLINE) values ('KL00987',to_timestamp('22-DEC-17 03.30.00.000000000 PM','DD-MON-RR HH.MI.SSXFF AM'),'N',4,5);
Insert into AIRPORT.FLIGHTS (FLIGHT_NUMBER,DATE_TIME,IS_ARRIVAL,PLACE,AIRLINE) values ('FR5702',to_timestamp('22-NOV-17 12.30.00.000000000 PM','DD-MON-RR HH.MI.SSXFF AM'),'Y',1,3);
Insert into AIRPORT.FLIGHTS (FLIGHT_NUMBER,DATE_TIME,IS_ARRIVAL,PLACE,AIRLINE) values ('BA0071',to_timestamp('14-NOV-17 10.19.24.000000000 AM','DD-MON-RR HH.MI.SSXFF AM'),'N',2,2);
Insert into AIRPORT.FLIGHTS (FLIGHT_NUMBER,DATE_TIME,IS_ARRIVAL,PLACE,AIRLINE) values ('LH9981',to_timestamp('30-NOV-17 05.19.25.000000000 PM','DD-MON-RR HH.MI.SSXFF AM'),'N',3,1);
Insert into AIRPORT.FLIGHTS (FLIGHT_NUMBER,DATE_TIME,IS_ARRIVAL,PLACE,AIRLINE) values ('AA3221',to_timestamp('19-NOV-17 09.19.25.000000000 PM','DD-MON-RR HH.MI.SSXFF AM'),'Y',4,4);
--------------------------------------------------------
--  DDL for Index AIRLINES_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "AIRPORT"."AIRLINES_PK" ON "AIRPORT"."AIRLINES" ("ID");
--------------------------------------------------------
--  DDL for Index AIRPORTS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "AIRPORT"."AIRPORTS_PK" ON "AIRPORT"."AIRPORTS" ("ID");
--------------------------------------------------------
--  DDL for Index CHECK_IN_DATA_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "AIRPORT"."CHECK_IN_DATA_PK" ON "AIRPORT"."CHECK_IN_DATA" ("FIRST_NAME", "FLIGHT_NO", "ID_NUMBER");
--------------------------------------------------------
--  DDL for Index FLIGHTS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "AIRPORT"."FLIGHTS_PK" ON "AIRPORT"."FLIGHTS" ("FLIGHT_NUMBER");
--------------------------------------------------------
--  Constraints for Table AIRLINES
--------------------------------------------------------

  ALTER TABLE "AIRPORT"."AIRLINES" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "AIRPORT"."AIRLINES" ADD CONSTRAINT "AIRLINES_PK" PRIMARY KEY ("ID") ENABLE;
--------------------------------------------------------
--  Constraints for Table AIRPORTS
--------------------------------------------------------

  ALTER TABLE "AIRPORT"."AIRPORTS" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "AIRPORT"."AIRPORTS" ADD CONSTRAINT "AIRPORTS_PK" PRIMARY KEY ("ID") ENABLE;
--------------------------------------------------------
--  Constraints for Table CHECK_IN_DATA
--------------------------------------------------------

  ALTER TABLE "AIRPORT"."CHECK_IN_DATA" MODIFY ("FIRST_NAME" NOT NULL ENABLE);
  ALTER TABLE "AIRPORT"."CHECK_IN_DATA" MODIFY ("FLIGHT_NO" NOT NULL ENABLE);
  ALTER TABLE "AIRPORT"."CHECK_IN_DATA" MODIFY ("ID_NUMBER" NOT NULL ENABLE);
  ALTER TABLE "AIRPORT"."CHECK_IN_DATA" ADD CONSTRAINT "CHECK_IN_DATA_PK" PRIMARY KEY ("FIRST_NAME", "FLIGHT_NO", "ID_NUMBER") ENABLE;
--------------------------------------------------------
--  Constraints for Table FLIGHTS
--------------------------------------------------------

  ALTER TABLE "AIRPORT"."FLIGHTS" MODIFY ("FLIGHT_NUMBER" NOT NULL ENABLE);
  ALTER TABLE "AIRPORT"."FLIGHTS" MODIFY ("IS_ARRIVAL" NOT NULL ENABLE);
  ALTER TABLE "AIRPORT"."FLIGHTS" ADD CONSTRAINT "FLIGHTS_PK" PRIMARY KEY ("FLIGHT_NUMBER") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table CHECK_IN_DATA
--------------------------------------------------------

  ALTER TABLE "AIRPORT"."CHECK_IN_DATA" ADD CONSTRAINT "CHECK_IN_DATA_FK1" FOREIGN KEY ("FLIGHT_NO")
	  REFERENCES "AIRPORT"."FLIGHTS" ("FLIGHT_NUMBER") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table FLIGHTS
--------------------------------------------------------

  ALTER TABLE "AIRPORT"."FLIGHTS" ADD CONSTRAINT "AIRPORTS_FK" FOREIGN KEY ("PLACE")
	  REFERENCES "AIRPORT"."AIRPORTS" ("ID") ENABLE;
  ALTER TABLE "AIRPORT"."FLIGHTS" ADD CONSTRAINT "AIRLINES_FK" FOREIGN KEY ("AIRLINE")
	  REFERENCES "AIRPORT"."AIRLINES" ("ID") ENABLE;
