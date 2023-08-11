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
}
