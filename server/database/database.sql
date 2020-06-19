drop database if exists todo_app;

create database todo_app;
use todo_app;

create table table_work (
	work_id varchar(32) not null,
  work_name varchar(100) not null,
  work_content varchar(500) not null,
  work_status bit not null,
  work_create_timestamp timestamp not null default current_timestamp,

  primary key (work_id)
);

delimiter //

create function create_id() returns varchar(32) begin
  return replace(uuid(),'-','');
end //

create procedure select_work() begin
  select
		work_id,
		work_name,
		work_content,
		work_status
  from table_work
  order by work_create_timestamp asc;
end //

create procedure create_work(_name varchar(100), _content varchar(500)) begin
	declare _id varchar(32) default create_id();

	insert into table_work values(
		_id, -- work_id varchar(32)
		_name, -- varchar(100)
		_content, -- varchar(500)
		0, -- work_status bit,
		null
	);

  select
		work_id,
		work_name,
		work_content,
		work_status
  from table_work
  where work_id = _id;
end //

create procedure update_work(_id varchar(32), _name varchar(100), _content varchar(500), _status bit) begin
update table_work set
		work_name = _name,
		work_content = _content,
		work_status = _status
	where work_id = _id;

  select
		work_id,
		work_name,
		work_content,
		work_status
  from table_work
  where work_id = _id;
end //

create procedure delete_work(_id varchar(32)) begin
	delete from table_work
	where work_id = _id;
  
  select true;
end //

delimiter ;

insert into table_work values(
	create_id(), -- work_id varchar(32)
  'Homework', -- varchar(100)
  'Complete homework before June 25', -- varchar(500)
	0, -- work_status bit,
  null
);

insert into table_work values(
	create_id(), -- work_id varchar(32)
  'Receive packages at post office', -- varchar(100)
  'Receive packages at post office on June 29', -- varchar(500)
	0, -- work_status bit,
  null
);