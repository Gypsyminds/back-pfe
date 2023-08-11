package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.Certification;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationRepository extends CrudRepository<Certification,Long> {
}
