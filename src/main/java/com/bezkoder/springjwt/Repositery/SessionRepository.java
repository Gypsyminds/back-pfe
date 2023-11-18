package com.bezkoder.springjwt.Repositery;

import com.bezkoder.springjwt.models.Session;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends CrudRepository<Session,Long> {
}
