-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatype in your design, you will have to change these here.

CREATE TABLE "users" (
	"userId" int4 NOT NULL DEFAULT nextval('users_userid_seq'::regclass),
	"userName" varchar(20) NOT NULL,
	"userEmail" varchar(20) NOT NULL,
	"userPassword" varchar NOT NULL,
	"userRole" varchar(20) NOT NULL,
	CONSTRAINT "chk_userrole" CHECK ((("userRole")::text = ANY ((ARRAY['Student'::character varying, 'Trainer'::character varying])::text[]))),
	CONSTRAINT "pk_user" PRIMARY KEY ("userId"),
	CONSTRAINT "uc_user_useremail" UNIQUE ("userEmail")
);

CREATE TABLE "courses" (
	"courseId" int4 NOT NULL DEFAULT nextval('course_courseid_seq'::regclass),
	"courseName" varchar(20) NOT NULL,
	"courseDescription" varchar(200) NOT NULL,
	"trainerId" int4 NOT NULL,
	"createdBy" int4 NOT NULL,
	"createdAt" date NOT NULL DEFAULT CURRENT_DATE,
	"updatedBy" int4 NULL,
	"updatedAt" date NULL,
	CONSTRAINT "pk_course" PRIMARY KEY ("courseId"),
	CONSTRAINT "fk_course_createdby" FOREIGN KEY ("createdBy") REFERENCES "users"("userId"),
	CONSTRAINT "fk_course_trainerid" FOREIGN KEY ("trainerId") REFERENCES "users"("userId"),
	CONSTRAINT "fk_course_updatedby" FOREIGN KEY ("updatedBy") REFERENCES "users"("userId")
);

CREATE TABLE "modules" (
	"moduleId" int4 NOT NULL DEFAULT nextval('modules_moduleid_seq'::regclass),
	"moduleName" varchar(20) NOT NULL,
	"courseId" int4 NOT NULL,
	"createdBy" int4 NOT NULL,
	"createdAt" date NOT NULL DEFAULT CURRENT_DATE,
	"updatedBy" int4 NULL,
	"updatedAt" date NULL,
	CONSTRAINT "pk_modules" PRIMARY KEY ("moduleId"),
	CONSTRAINT "fk_modules_courseid" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId"),
	CONSTRAINT "fk_modules_createdby" FOREIGN KEY ("createdBy") REFERENCES "users"("userId"),
	CONSTRAINT "fk_modules_updatedby" FOREIGN KEY ("updatedBy") REFERENCES "users"("userId")
);

CREATE TABLE "lessons" (
	"lessonId" int4 NOT NULL DEFAULT nextval('lessons_lessonid_seq'::regclass),
	"lessonName" varchar(20) NOT NULL,
	"lessonLink" varchar(50) NOT NULL,
	"moduleId" int4 NOT NULL,
	"lessonDescription" varchar(200) NOT NULL,
	"createdBy" int4 NOT NULL,
	"createdAt" date NOT NULL DEFAULT CURRENT_DATE,
	"updatedBy" int4 NULL,
	"updatedAt" date NULL,
	CONSTRAINT "pk_lessons" PRIMARY KEY ("lessonId"),
	CONSTRAINT "fk_lessons_createdby" FOREIGN KEY ("createdBy") REFERENCES "users"("userId"),
	CONSTRAINT "fk_lessons_moduleid" FOREIGN KEY ("moduleId") REFERENCES "modules"("moduleId"),
	CONSTRAINT "fk_lessons_updatedby" FOREIGN KEY ("updatedBy") REFERENCES "users"("userId")
);

CREATE TABLE "enrollments" (
	"enrollId" int4 NOT NULL DEFAULT nextval('enrollment_enrollid_seq'::regclass),
	"enrollAt" date NOT NULL DEFAULT CURRENT_DATE,
	"studentId" int4 NOT NULL,
	"courseId" int4 NOT NULL,
	CONSTRAINT "pk_enrollment" PRIMARY KEY ("enrollId"),
	CONSTRAINT "fk_enrollment_courseid" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId"),
	CONSTRAINT "fk_enrollment_studentid" FOREIGN KEY ("studentId") REFERENCES "users"("userId")
);

CREATE TABLE "courseRatings" (
	"ratingId" int4 NOT NULL DEFAULT nextval('courserating_ratingid_seq'::regclass),
	"rating" float8 NOT NULL DEFAULT 0,
	"ratedAt" date NOT NULL DEFAULT CURRENT_DATE,
	"courseId" int4 NOT NULL,
	"studentId" int4 NOT NULL,
	CONSTRAINT "chk_rating" CHECK ((("rating" >= (0)::double precision) AND ("rating" <= (10)::double precision))),
	CONSTRAINT "pk_courserating" PRIMARY KEY ("ratingId"),
	CONSTRAINT "fk_courserating_courseid" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId"),
	CONSTRAINT "fk_courserating_studentid" FOREIGN KEY ("studentId") REFERENCES "users"("userId")
);

CREATE TABLE "blockStudents" (
	"blockstudentId" int4 NOT NULL DEFAULT nextval('blockstudent_blockstudentid_seq'::regclass),
	"blockedBy" int4 NOT NULL,
	"studentId" int4 NOT NULL,
	"courseId" int4 NOT NULL,
	"blockedAt" date NOT NULL DEFAULT CURRENT_DATE,
	CONSTRAINT "pk_blockstudent" PRIMARY KEY ("blockstudentId"),
	CONSTRAINT "fk_blockstudent_blockedby" FOREIGN KEY ("blockedBy") REFERENCES "users"("userId"),
	CONSTRAINT "fk_blockstudent_courseid" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId"),
	CONSTRAINT "fk_blockstudent_studentid" FOREIGN KEY ("studentId") REFERENCES "users"("userId")
);
