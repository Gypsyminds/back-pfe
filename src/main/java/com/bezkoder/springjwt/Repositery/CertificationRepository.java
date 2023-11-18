package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.Certification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationRepository extends CrudRepository<Certification,Long> {
    @Query(value = "select count(*) from certification;", nativeQuery=true)
    int nubcertifs();
    @Query(value = "select id_certif from certification ORDER BY id_certif DESC LIMIT 1", nativeQuery=true)
    long idlastcertif();
}
