package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course,Long> {
    @Query(value = "select count(*) from course;", nativeQuery=true)
    int nubcours();
}
