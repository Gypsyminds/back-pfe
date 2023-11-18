package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.Certif_test;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface Certif_testRepository extends CrudRepository<Certif_test,Long> {

    @Query(value="select count(*) from certif_test l where l.problem_id_pr:problem_id_pr",nativeQuery=true)
    long Test_Certifprob(@Param("problem_id_pr") long problem_id_pr);

    @Query(value = "select count(*) from certif_test;", nativeQuery=true)
    int nubtest();

    @Query(value="select  id_test from certif_test where tests_id_course= :tests_is_course",nativeQuery=true)
    Long CourId(@Param("tests_is_course") long tests_is_course);
}
