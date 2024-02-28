CREATE TABLE "tb_users" (
  "id" serial4 PRIMARY KEY,
  "prefix_id" int4 NOT NULL,
  "username" varchar(100) NOT NULL,
  "password" varchar(100) NOT NULL,
  "fristname" varchar(100) NOT NULL,
  "lastname" varchar(100) NOT NULL,
  "nickname" varchar(100) NOT NULL,
  "id_card" varchar(100) NOT NULL,
  "email" varchar(100) NOT NULL,
  "mobile_no" varchar(10) NOT NULL,
  "status" int4 NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_user_personal_record" (
  "id" serial4 PRIMARY KEY,
  "user_id" int4 NOT NULL,
  "birthday" varchar(100) NOT NULL,
  "age" numeric NOT NULL,
  "weight" numeric NOT NULL,
  "height" numeric NOT NULL,
  "nationality" varchar(100) NOT NULL,
  "believe" varchar(100) NOT NULL,
  "religion" varchar(100) NOT NULL,
  "blood_group" varchar(100) NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_user_address" (
  "id" serial4 PRIMARY KEY,
  "user_id" int4 NOT NULL,
  "province_id" int4 NOT NULL,
  "district_id" int4 NOT NULL,
  "subdistrict_id" int4 NOT NULL,
  "house_number" varchar(100) NOT NULL,
  "village" varchar(100) NOT NULL,
  "road" varchar(100) NOT NULL,
  "zip_code" varchar(100) NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_company" (
  "id" serial4 PRIMARY KEY,
  "province_id" int4 NOT NULL,
  "district_id" int4 NOT NULL,
  "subdistrict_id" int4 NOT NULL,
  "company_name" varchar(100) NOT NULL,
  "company_number" varchar(100) NOT NULL,
  "village" varchar(100) NOT NULL,
  "road" varchar(100) NOT NULL,
  "email" varchar(100) NOT NULL,
  "mobile_no" varchar(10) NOT NULL,
  "zip_code" varchar(100) NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_stock" (
  "id" serial4 PRIMARY KEY,
  "stock_name" varchar(255) NOT NULL,
  "price" numeric NOT NULL,
  "quantity" numeric NOT NULL,
  "stock_addres" varchar(255) NOT NULL,
  "safety_stock" numeric NOT NULL,
  "counted_number" numeric NOT NULL,
  "in_stock" numeric NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_customer" (
  "id" serial4 PRIMARY KEY,
  "invoice_id" int4 NOT NULL,
  "deceased_name" varchar(100) NOT NULL,
  "contact_person" varchar(100) NOT NULL,
  "customer_address" varchar(255) NOT NULL,
  "mobile_no" varchar(10) NOT NULL,
  "receive_from" varchar(100) NOT NULL,
  "send" varchar(100) NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_invoice" (
  "id" serial4 PRIMARY KEY,
  "payment_id" int4 NOT NULL,
  "user_id" int4 NOT NULL,
  "company_id" int4 NOT NULL,
  "invoice_type_id" int4 NOT NULL,
  "issue_date" timestamp NOT NULL,
  "volume_no" int4,
  "bill_number" varchar(100) NOT NULL,
  "total" numeric NOT NULL,
  "payment" int4 NOT NULL,
  "net_balance" numeric NOT NULL,
  "note" varchar(255),
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_cheque" (
  "id" serial4 PRIMARY KEY,
  "invoice_id" int4 NOT NULL,
  "payment_id" int4 NOT NULL,
  "bank_id" int4 NOT NULL,
  "cheque_number" int4 NOT NULL,
  "payee_only" bool,
  "cheque_issue_date" timestamp NOT NULL,
  "cheque_cut_date" timestamp NOT NULL,
  "payment_details" varchar(255),
  "amount_money" numeric NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_tem_stock" (
  "id" serial4 PRIMARY KEY,
  "invoice_id" int4 NOT NULL,
  "stock_id" int4 NOT NULL,
  "stock_name" varchar(255) NOT NULL,
  "amount_used" numeric NOT NULL,
  "price" numeric NOT NULL,
  "total_price" numeric NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_img_stock" (
  "id" serial4 PRIMARY KEY,
  "stock_id" int4 NOT NULL,
  "part_img" varchar(255) NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_mas_user_prefix" (
  "id" serial4 PRIMARY KEY,
  "prefix_name" varchar(100) NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_mas_province" (
  "id" serial4 PRIMARY KEY,
  "province_name" varchar(100) NOT NULL,
  "zip_code" varchar(100) NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_mas_district" (
  "id" serial4 PRIMARY KEY,
  "province_id" int4 NOT NULL,
  "district_name" varchar(100) NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_mas_subdistrict" (
  "id" serial4 PRIMARY KEY,
  "province_id" int4 NOT NULL,
  "district_id" int4 NOT NULL,
  "subdistrict_name" varchar(100) NOT NULL,
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_mas_payment" (
  "id" serial4 PRIMARY KEY,
  "payment_type" int4,
  "payment_name" varchar(255),
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_mas_invoice_type" (
  "id" serial4 PRIMARY KEY,
  "invoice_type" int4,
  "invoice_name" varchar(255),
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

CREATE TABLE "tb_mas_bank" (
  "id" serial4 PRIMARY KEY,
  "bank_name" varchar(100),
  "create_by" varchar(255),
  "create_date" timestamp,
  "update_by" varchar(255),
  "update_date" timestamp,
  "active_flag" varchar
);

ALTER TABLE "tb_mas_user_prefix" ADD FOREIGN KEY ("id") REFERENCES "tb_users" ("prefix_id");

ALTER TABLE "tb_users" ADD FOREIGN KEY ("id") REFERENCES "tb_user_personal_record" ("user_id");

ALTER TABLE "tb_users" ADD FOREIGN KEY ("id") REFERENCES "tb_user_address" ("user_id");

ALTER TABLE "tb_user_address" ADD FOREIGN KEY ("province_id") REFERENCES "tb_mas_province" ("id");

ALTER TABLE "tb_user_address" ADD FOREIGN KEY ("district_id") REFERENCES "tb_mas_district" ("id");

ALTER TABLE "tb_user_address" ADD FOREIGN KEY ("subdistrict_id") REFERENCES "tb_mas_subdistrict" ("id");

ALTER TABLE "tb_company" ADD FOREIGN KEY ("province_id") REFERENCES "tb_mas_province" ("id");

ALTER TABLE "tb_company" ADD FOREIGN KEY ("district_id") REFERENCES "tb_mas_district" ("id");

ALTER TABLE "tb_company" ADD FOREIGN KEY ("subdistrict_id") REFERENCES "tb_mas_subdistrict" ("id");

ALTER TABLE "tb_mas_district" ADD FOREIGN KEY ("province_id") REFERENCES "tb_mas_province" ("id");

ALTER TABLE "tb_mas_subdistrict" ADD FOREIGN KEY ("province_id") REFERENCES "tb_mas_province" ("id");

ALTER TABLE "tb_mas_subdistrict" ADD FOREIGN KEY ("district_id") REFERENCES "tb_mas_district" ("id");

ALTER TABLE "tb_customer" ADD FOREIGN KEY ("invoice_id") REFERENCES "tb_invoice" ("id");

ALTER TABLE "tb_invoice" ADD FOREIGN KEY ("user_id") REFERENCES "tb_users" ("id");

ALTER TABLE "tb_invoice" ADD FOREIGN KEY ("company_id") REFERENCES "tb_company" ("id");

ALTER TABLE "tb_mas_payment" ADD FOREIGN KEY ("id") REFERENCES "tb_invoice" ("payment_id");

ALTER TABLE "tb_mas_invoice_type" ADD FOREIGN KEY ("id") REFERENCES "tb_invoice" ("invoice_type_id");

ALTER TABLE "tb_stock" ADD FOREIGN KEY ("id") REFERENCES "tb_tem_stock" ("stock_id");

ALTER TABLE "tb_invoice" ADD FOREIGN KEY ("id") REFERENCES "tb_tem_stock" ("invoice_id");

ALTER TABLE "tb_cheque" ADD FOREIGN KEY ("bank_id") REFERENCES "tb_mas_bank" ("id");

ALTER TABLE "tb_cheque" ADD FOREIGN KEY ("payment_id") REFERENCES "tb_mas_payment" ("id");

ALTER TABLE "tb_cheque" ADD FOREIGN KEY ("invoice_id") REFERENCES "tb_invoice" ("id");

ALTER TABLE "tb_img_stock" ADD FOREIGN KEY ("stock_id") REFERENCES "tb_stock" ("id");
