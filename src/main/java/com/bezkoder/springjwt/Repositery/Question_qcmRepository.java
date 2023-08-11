package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.Question_qcm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Question_qcmRepository extends CrudRepository<Question_qcm,Long> {
    //@Query(value="select count(*) from question_qcm l where l.id_qs_qcm= :id_qs_qcm",nativeQuery=true)
   // long nb_qcm(@Param("id_qs_qcm") long id_qs_qcm);

    //@Query(value="select  id_qs_qcm from question_qcm limit 2",nativeQuery=true)
    //List<Question_qcm> find30QCM();


   // @Query(value = "select score from question_qcm  score  where id_qs_qcm= :id_qs_qcm",nativeQuery = true)
    //Long score (@Param("id_ds_qcm") long id_qs_qcm);
    @Query(value = "select * from question_qcm where certif_id_test= :certif_id_test ORDER BY RAND() ", nativeQuery=true)
    List<Question_qcm> findRandom(@Param("certif_id_test") long certif_id_test);


}
