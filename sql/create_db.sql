create table sensordata
(
    id serial primary key,
    sensor varchar(15) not null,
    ts timestamp with time zone not null, 
    temperature real not null, 
    lat real, 
    long real
);